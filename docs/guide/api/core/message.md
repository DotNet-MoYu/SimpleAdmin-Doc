<!-- 消息中心 -->

# 消息中心

## 介绍
在之前的版本中，即时消息的发送都是通过自身项目启用mqtt或者websocket实例来发送的，经过深思熟虑，我觉得将消息发送的功能独立出来，作为一个独立的服务，这样可以更好的解耦，也可以更好的管理消息的发送，所以我将消息发送的功能独立出来，作为一个独立的服务，这个服务就是消息中心`MessageCenter`。
api端只负责创建消息，然后告诉消息中心需要在什么时间发送消息，消息中心收到消息后在指定时间发送消息，这样就可以实现消息的定时发送，消息的发送时间可以是任意时间，只要消息中心在线，消息就会按照指定的时间发送。
![xiaoxizhongxin.png](/mqtt/xiaoxizhongxin.png)
::: tip 提示、
- 消息中心位于`应用服务`->`后台服务`
- 消息中心是一个独立的服务，需要单独部署
- 消息中心的消息发送是通过`mqtt`协议发送的
- 使用消息中心必须启用Redis服务
:::

## 启用消息中心

### 使用Redis缓存
消息中心使用Redis延迟队列来实现消息发送，所以在使用消息中心之前，必须启用Redis服务，如果你还没有启用Redis服务，请先在`SimpleAdmin.Cache`启用Redis服务。
```json {4}
{
  //缓存设置
  "CacheSettings": {
    "UseRedis": true, //启用redis
    "RedisSettings": {
      "Address": "127.0.0.1:6379", //地址
      "Password": "123456", //Redis服务密码
      "Db": 9, //默认库
      "ClearRedis": true //是否每次启动都清除Redis缓存
    }
  }
}
```
### 启用消息中心
在`SimpleAdmin.System`配置文件中启动消息中心
```json {6}
  //系统层设置
  "SystemSettings": {
    "InitTable": false, //是否初始化表结构
    "InitSeedData": false, //是否初始化种子数据
    "SuperAdminViewAllData": true, //是否超级管理员可以查看所有数据
    "UseMessageCenter": true, //是否启用通知中心
  }
```
## 使用消息中心

### 添加消息到事件总线
在`MessageService`里,当我们添加了一条站内信，会将该消息添加到事件总线中
```csharp
            await _eventPublisher.PublishAsync(EventSubscriberConst.NEW_MESSAGE, new NewMessageEvent
            {
                Id = sysMessage.Id,
                SendWay = sysMessage.SendWay,
                SendTime = sysMessage.SendTime
            });//通知用户有新的消息
```

### 事件总线处理
事件总线会根据发送事件计算延迟事件,然后交给消息中心处理
```csharp
    /// <summary>
    /// 有新的消息
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    [EventSubscribe(EventSubscriberConst.NEW_MESSAGE)]
    public async Task NewMessage(EventHandlerExecutingContext context)
    {
        var newMessageEvent = (NewMessageEvent)context.Source.Payload;//获取参数
        var messageId = newMessageEvent.Id;
        //如果启用了通知中心
        if (_useMessageCenter)
        {
            if (newMessageEvent.SendWay == SysDictConst.SEND_WAY_NOW)
            {
                //立即发送
                await SendMessage(messageId);
            }
            else
            {
                //延迟发送
                var sendTime = newMessageEvent.SendTime;
                //计算延迟时间
                var delay = (int)(sendTime - DateTime.Now).TotalSeconds;
                if (delay > 0)
                {
                    await SendMessage(messageId, delay);
                }
                else
                {
                    await SendMessage(messageId);
                }
            }
        }
    }
    
    
    /// <summary>
    /// 发送消息
    /// </summary>
    /// <param name="messageId">消息id</param>
    /// <param name="delay">延迟</param>
    private async Task SendMessage(long messageId, int delay = 0)
    {
        _simpleCacheService.AddDelayQueue(CacheConst.CACHE_NOTIFICATION, messageId, delay);
    }

```


### 处理消息
`MessageCenter` 拿到消息后会对消息进行处理然后通过`MQTT`发送
```csharp
//获取延迟队列
        var queue = _simpleCacheService.GetDelayQueue<long>(CacheConst.CACHE_NOTIFICATION);
        while (!stoppingToken.IsCancellationRequested)
        {
            //一次拿十条，如果拿一条就用queue.TakeOneAsync(-1);-1是超时时间，默认0秒永远阻塞；负数表示直接返回，不阻塞。
            var data = await queue.TakeOneAsync(-1);
            if (data != 0)
            {
                _logger.LogDebug($"消费者收到消息,消息ID:{data},时间：{DateTime.Now}");
                var db = DbContext.DB.CopyNew();
                //获取消息
                var message = await db.Queryable<SysMessage>().InSingleAsync(data);
                if (message != null)
                {
                    message.Status = SysDictConst.MESSAGE_STATUS_ALREADY;
                    //获取待发送的消息
                    var messageUsers = await db.Queryable<SysMessageUser>()
                        .Where(it => it.MessageId == message.Id && it.Status == SysDictConst.MESSAGE_STATUS_READY).ToListAsync();
                    var hasError = false;
                    //开启事务
                    var result = await db.UseTranAsync(async () =>
                    {
                        messageUsers.ForEach(it =>
                        {
                            try
                            {
                                //发送消息
                                _mqttClient.PublishAsync(MqttConst.MQTT_TOPIC_PREFIX + it.UserId, new MqttMessage()
                                {
                                    MsgType = MqttConst.MQTT_MESSAGE_NEW,
                                    Data = new MessageData()
                                    {
                                        Subject = message.Subject,
                                        Content = message.Content
                                    }
                                });
                                it.Status = SysDictConst.MESSAGE_STATUS_ALREADY;
                                it.UpdateTime = DateTime.Now;
                            }
                            catch (Exception e)
                            {
                                hasError = true;
                                _logger.LogError($"发送消息失败:{e.Message}");
                            }
                        });
                        await db.Updateable(messageUsers).ExecuteCommandAsync();
                        await db.Updateable(message).ExecuteCommandAsync();
                    });
                    //如果有失败的，重写发到延迟队列
                    if (hasError)
                    {
                        _logger.LogDebug($"有失败的消息，重新发到延迟队列");
                        queue.Add(message.Id, 5);
                    }
                }
                queue.Acknowledge(data);//告诉队列已经消费了的数据
                _logger.LogDebug("消费成功");
            }
            else
            {
                _logger.LogDebug("消费者从队列中没有拿到数据:" + DateTime.Now);
                await Task.Delay(1000, stoppingToken);
            }
        }
```
### 消息格式
消息格式如下
```csharp

/// <summary>
/// mqtt消息
/// </summary>
public class MqttMessage
{
    /// <summary>
    /// 消息分类
    /// </summary>
    public string MsgType { get; set; }

    /// <summary>
    /// 消息内容
    /// </summary>
    public MessageData Data { get; set; }

    /// <summary>
    /// 时间
    /// </summary>
    public DateTime DetTime { get; set; } = DateTime.Now;
}

/// <summary>
/// 消息格式
/// </summary>
public class MessageData
{
    /// <summary>
    /// 主题
    /// </summary>
    public string Subject { get; set; }

    /// <summary>
    ///  内容
    /// </summary>
    public string Content { get; set; }
}

```
