<!-- 消息通知 -->
# 消息通知

## 为什么需要消息通知
在实际开发中，我们经常需要实时的消息通知，比如聊天消息、系统通知、报警通知等。在传统的开发中，我们通常使用轮询的方式来实现消息通知，但是轮询的方式会增加服务器的压力，而且实时性不高。为了解决这个问题，我们可以使用`MQTT`来实现消息通知。SimpleAdmin同时支持`轮询`和`MQTT`两种消息通知方式，可以根据实际需求来选择。
### 站内信
SimpleAdmin通过站内信的方式来实现消息通知，站内信是一种站内消息通知方式，用户可以在站内信中查看消息通知，站内信支持实时消息通知，用户可以在站内信中查看消息通知，点击消息通知可以跳转到相应的页面。
![zhanneixin.png](/mqtt/zhanneixin.png)

### 接收通知
SimpleAdmin可以在页面中实时接收消息通知，当有新消息时会弹出消息通知，点击消息通知可以跳转到相应的页面。页面右上角会显示未读消息数，点击未读消息数可以查看未读消息列表。
![notice.png](/mqtt/notice.png)

::: tip 提示
- SimpleAdmin支持`轮询`和`MQTT`两种消息通知方式，可以根据实际需求来选择。
- 默认10秒轮询一次，可以在前端代码中修改轮询时间。
:::

## 轮询
通过定时的方式去获取最新的消息，这种方式实时性一般，根据设置的时间间隔,有一定的延迟，适合消息实时性要求不高的场景。
通过定义消息通知的`Pinia`存储未读消息信息。
::: details 点击查看代码
```typescript
import { defineStore } from "pinia";
import { userCenterApi, UserCenter, SysMessage } from "@/api";
import { ElNotification } from "element-plus";
import { Message } from "@element-plus/icons-vue";

const name = "simple-message"; // 定义模块名称

/* MqttState */
export interface MessageState {
  /** 未读消息信息 */
  unReadInfo: any;
  /** 未读消息数 */
  unReadCount: number;
  /** 新未读消息 */
  newUnRead: SysMessage.SysMessageInfo[];
}

/** Mqtt模块 */
export const useMessageStore = defineStore({
  id: name,
  state: (): MessageState => ({
    unReadInfo: {},
    unReadCount: 0,
    newUnRead: []
  }),
  getters: {
    unReadCountGet: state => state.unReadCount,
    unReadInfoGet: state => state.unReadInfo
  },
  actions: {
    /** 显示更多 */
    setShowMore(state: boolean) {
      this.showMore = state;
    },
    /** 增加未读消息数 */
    unReadCountAdd(value: number) {
      this.unReadCount += value;
    },
    /** 减少未读消息数 */
    unReadCountSubtract(value: number) {
      this.unReadCount -= value;
    },
    /** 设置未读消息数 */
    unReadCountSet(value: number) {
      this.unReadCount = value;
    },
    /** 获取未读消息数 */
    async getUnReadInfo(notice: boolean = false) {
      await userCenterApi.unReadCount().then(res => {
        if (res.data.length > 0) {
          //未读消息信息数量转换
          this.unReadInfo = res.data.reduce((acc, item) => {
            acc[item.category] = item.unReadCount;
            return acc;
          }, {});
          //遍历未读消息信息，获取未读消息总数
          let count = 0;
          res.data.map((item: UserCenter.ResUnReadCount) => {
            count += item.unReadCount;
          });
          //如果未读消息总数大于当前未读消息总数，则获取最新未读消息
          if (count > this.unReadCount) {
            this.getNewMessage(notice);
          }
          this.unReadCountSet(count);
        } else {
          this.unReadCountSet(0);
        }
      });
    },
    /** 获取最新未读消息 */
    async getNewUnRead() {
      await userCenterApi.newUnRead().then(res => {
        if (res.data.length > 0) {
          this.newUnRead = res.data;
        }
      });
    },
    /** 获取未读消息数 */
    getUnReadCount(category: string) {
      return this.unReadInfo[category] || 0;
    },
    /**提示有新消息 */
    getNewMessage(notice: boolean = false, message: string = "您有一条新消息,请注意查收!") {
      this.getNewUnRead();
      if (notice) {
        ElNotification({
          title: "收到一条新消息",
          message: message,
          icon: Message,
          offset: 40
        });
      }
    },
    /**定时刷新最新消息*/
    async getNewMessageInterval() {
      setInterval(() => {
        this.getUnReadInfo(true);
      }, 10000);
    },
		/* 重置未读消息数 */
		reSet() {
			this.unReadCount = 0;
			this.unReadInfo = {};
			this.newUnRead = [];
		}
  }
});
```
::: 

## 使用轮询
系统默认使用定时轮询的方式获取消息通知，需要在前端配置文件中关闭定时轮询。在在layouts文件夹下的`index.vue`中调用了`getNewMessageInterval`方法，该方法会定时获取最新的消息通知。

```typescript
  await messageStore.getNewMessageInterval(); //定时获取新消息
```

## MQTT介绍
MQTT（Message Queuing Telemetry Transport，消息队列遥测传输）是一种轻量级的、基于发布 / 订阅模式的消息传输协议，专为低带宽、高延迟或不可靠的网络环境设计。MQTT 协议构建于 TCP/IP 协议之上，是一种二进制协议，协议头部小，数据包小，传输速度快，适合在各种网络环境中使用。
::: tip MQTT的优点
- 轻量级和高效：
MQTT 协议头部最小只有 2 字节，整个消息最大不超过 256MB，适合带宽受限的网络环境。
它允许通过压缩技术进一步减少消息大小，从而提高传输效率。
低功耗：
MQTT 协议设计考虑了设备的能耗，适合电池供电的设备，有助于延长设备的使用寿命。
- 高可靠性：
通过消息确认机制（QoS 级别），MQTT 确保消息可靠传输，支持 “最多一次”、“至少一次” 和 “只有一次” 三种服务质量等级。
- 易于实现：
MQTT 协议简单，易于在各种设备上实现，包括嵌入式系统和移动设备。
- 跨平台：
MQTT 支持多种编程语言和平台，使得开发者可以轻松地在不同环境中部署和使用。
支持大量客户端：
MQTT 设计支持大量客户端连接，这对于物联网环境中的设备管理尤为重要。
- 保持连接：
MQTT 客户端和服务器之间的连接是持久的，即使在网络不稳定的情况下也能保持连接状态。
- 安全性：
MQTT 支持 TLS/SSL 加密，确保数据传输的安全性，防止数据被窃取或篡改。
发布 / 订阅模式：
MQTT 采用发布 / 订阅模式，使得消息分发更加灵活和高效，客户端只需订阅感兴趣的主题即可接收相关消息。
- 支持离线消息：
MQTT 支持消息的持久化存储，即使客户端暂时离线，也能在重新连接后接收到离线期间的消息。
可扩展性：
MQTT 协议支持集群和负载均衡，可以轻松扩展以支持更多的客户端和消息流量。
- 成本效益：
由于其轻量级和高效的特性，MQTT 可以减少网络带宽和服务器资源的使用，从而降低运营成本。
:::


## 弃用Websocket
在之前的版本中，我们使用了`Websocket`和`MQTT`来实现消息通知。但是在实际开发使用中，我们发现`Websocket`的消息通知并没有给我们开发效率带来了提升，由于本人在工作中经常使用`MQTT`协议，发现`MQTT`完全可以代替`Websocket`，而且`MQTT`更灵活，性能更强，通过`emqx`的broker可以实现几十万设备同时在线，所以我决定弃用`Websocket`，只使用`MQTT`来实现消息通知。
::: warning Websocket的缺点
- 浏览器兼容性：
尽管现代浏览器普遍支持 WebSocket，但一些旧版浏览器或特定环境下的浏览器可能不支持或支持不完全，这可能需要额外的 polyfill 或回退方案。
服务器资源消耗：
维持大量的 WebSocket 连接会消耗服务器的内存和处理器资源，尤其是在高并发场景下，这可能导致性能瓶颈。
- 安全性问题：
WebSocket 连接默认不加密，容易受到中间人攻击等安全威胁。虽然可以通过 wss（WebSocket Secure）协议使用 TLS 加密，但这增加了配置和维护的复杂性。
- 心跳机制：
为了保持连接活跃和检测断开，需要实现心跳机制，这增加了开发和维护的工作量。
跨域限制：
与 HTTP 一样，WebSocket 也受到同源策略的限制，跨域通信需要服务器端支持 CORS（跨源资源共享），这可能带来额外的配置和安全考虑。
- 协议开销：
虽然 WebSocket 相对于 HTTP 长轮询等技术来说开销较小，但在某些情况下，如传输非常小的数据包时，其协议开销仍然相对较大。
- 错误处理和重连策略：
WebSocket 连接可能因为网络问题或其他原因意外断开，需要在应用层实现错误处理和自动重连逻辑，这增加了开发的复杂性。
- 负载均衡复杂性：
在使用负载均衡器时，维持 WebSocket 连接的状态可能比较复杂，因为连接是持久的，而负载均衡器可能需要特别配置以支持 WebSocket 协议。
缺乏标准：
虽然 WebSocket 协议已经标准化，但一些高级功能和特性可能在不同的实现中有所不同，导致跨平台或跨服务的兼容性问题。
- 调试困难：
调试 WebSocket 连接可能比较困难，因为网络问题和协议细节可能使得问题难以追踪和解决。
- 不支持老旧系统：
对于不支持 WebSocket 的老旧系统或设备，WebSocket 无法直接使用，这限制了其应用范围。
:::


## 开启MQTT
需要弃用MQTT需要在前端配置文件中打开MQTT配置。
```bash
#是否启用mqtt
VITE_MQTT = true
```

## MQTT配置
MQTT连接的账号密码是通过后端接口获取的，需要在系统设置中配置MQTT的账号密码。
![mqtt.png](/mqtt/mqtt.png)

## 设计实现
### 引入MQTT包
```bash
"mqtt": "^5.10.1",
```

### 将MQTT写入Pinia
`stores/moudules`目录下创建mqtt.ts文件,用来连接和存储mqtt的相关信息。
::: details 点击查看代码
```typescript 
import mqtt from "mqtt";
import { defineStore } from "pinia";
import { mqttApi } from "@/api";
import { useMessageStore } from "@/stores/modules";
import { MqttMessage, MsgTypeEnum } from "../interface/mqtt";

const name = "simple-mqtt"; // 定义模块名称

/* MqttState */
export interface MqttState {
  /** 服务端地址 */
  url: string | undefined;
  /** 是否清除 */
  clean: boolean;
  /** 客户端 */
  client: any;
  /** 客户端id */
  clientId: string;
  /** 订阅主题列表 */
  topics: string[];
  /** 订阅主题的集合，key为topic, value为接收到该topic时需要执行的回调 */
  subscribeMembers: [{ string: any }] | undefined;
}

/** 订阅参数 */
export interface subscribeParams {
  /** 订阅主题 */
  topic: string;
  /** 订阅回调 */
  callback: number;
  /** 订阅选项 */
  subscribeOption: any;
}

/** Mqtt模块 */
export const useMqttStore = defineStore({
  id: name,
  state: (): MqttState => ({
    url: undefined,
    client: undefined,
    clientId: "",
    clean: true,
    topics: [],
    subscribeMembers: undefined
  }),
  getters: {},
  actions: {
    /** 获取mqtt参数 */
    async getMqttParameter() {
      return await mqttApi.getMqttParameter().then(res => {
        console.log("[ res ] >", res);
        this.clientId = res.data.clientId;
        this.url = res.data.url;
        this.topics = res.data.topics;
        return res.data;
      });
    },
    /** 初始化mqtt客户端 */
    async initMqttClient() {
      console.log("[ mqtt初始化 ] >");
      if (this.client) {
        this.disconnect();
      }
      await this.getMqttParameter().then(res => {
        const url = this.url;
        const options = {
          username: res.userName,
          password: res.password,
          clientId: this.clientId,
          clean: true, // true: 清除会话, false: 保留会话
          connectTimeout: 4000, // 超时时间
          keepAlive: 60 // 心跳时间
        };
        console.log("[ options ] >", options);
        // return;
        if (url) {
          this.client = mqtt.connect(url, options);
          this.client.on("connect", e => {
            this.onConnect(e);
          });
          this.client.on("reconnect", err => {
            this.onReconnect(err);
          });
          this.client.on("error", err => {
            this.onError(err);
          });
          this.client.on("message", (topic, message) => {
            this.onMessage(topic, message);
          });
        }
      });
    },
    /** 断开连接 */
    disconnect() {
      this.client.end();
      this.client = undefined;
      this.subscribeMembers = {};
    },
    /** 订阅 */
    subscribe(topics: string[]) {
      topics.forEach((item: string) => {
        this.client.subscribe(item, {}, (err, res) => {
          if (err) {
            console.log(`客户端: ${this.clientId}, 订阅主题: ${item}失败: `, err);
          } else {
            console.log(`客户端: ${this.clientId}, 订阅主题: ${item}成功,${JSON.stringify(res)}`);
          }
        });
      });
    },
    /** 订阅带回调函数 */
    subscribeCallback(params: subscribeParams) {
      const { topic, callback, subscribeOption } = params;
      this.client.subscribe(topic, subscribeOption, (err, res) => {
        if (err) {
          console.log(`客户端: ${this.clientId}, 订阅主题: ${topic}失败: `, err);
        } else {
          console.log(`客户端: ${this.clientId}, 订阅主题: ${topic}成功,${res}`);
        }
      });
      this.subscribeMembers.push({ topic, callback });
    },
    /** 取消订阅 */
    unsubscribe(topic: string) {
      if (!this.client) return;
      this.client.unsubscribe(topic, {}, (err, res) => {
        if (err) {
          console.log(`客户端: ${this.clientId}, 取消订阅主题: ${topic}失败: `, err);
        } else {
          console.log(`客户端: ${this.clientId}, 取消订阅主题: ${topic}成功,${res}`);
        }
      });
      this.subscribeMembers = this.subscribeMembers.filter((item: any) => item.topic !== topic);
    },
    /** 连接事件 */
    onConnect(e: any) {
      console.log(`客户端: ${this.clientId}, 连接mqtt服务器成功:`, e);
      this.subscribe(this.topics);
    },
    /** 重连事件 */
    onReconnect(err: any) {
      console.log(`客户端: ${this.clientId}, 正在重连mqtt服务器...`, err);
    },
    /** 错误事件 */
    onError(err: any) {
      console.log(`客户端: ${this.clientId}, 连接mqtt服务器失败:`, err);
    },
    /** 消息事件 */
    onMessage(topic: string, message: any) {
      console.log(message.toString());
      const messageStore = useMessageStore();
      const msg = JSON.parse(message.toString()) as MqttMessage;
      console.log(`客户端: ${this.clientId}, 接收到消息:`, topic, msg);
      switch (msg.MsgType) {
        case MsgTypeEnum.NewMessage:
          messageStore.getNewMessage(true, msg.Data.Subject);
          break;
        case MsgTypeEnum.LoginOut:
          break;
        case MsgTypeEnum.UpdatePassword:
          break;
      }
    }
  }
});

```
:::
### 使用MQTT
在layouts文件夹下的`index.vue`中使用mqtt。
```typescript
const openMqtt = import.meta.env.VITE_MQTT === "true"; //mqtt开关

onMounted(async () => {
  await initMqtt();
});

onUnmounted(() => {
  if (openMqtt) {
    mqttStore.disconnect(); //销毁mqtt
  }
});

/**初始化mqtt */
async function initMqtt() {
  if (openMqtt) {
    await mqttStore.initMqttClient(); //初始化mqtt
  } else {
    await messageStore.getNewMessageInterval(); //定时获取新消息
  }
}
```

### 连接MQTT
启动系统后，会自动连接MQTT服务器，连接成功后会订阅相关主题，当接收到消息时会触发`onMessage`事件，根据消息类型进行相应的操作。可以通过控制台查看MQTT连接情况。
![console.png](/mqtt/console.png)
