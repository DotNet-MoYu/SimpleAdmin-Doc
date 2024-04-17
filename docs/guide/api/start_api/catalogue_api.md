<!-- 目录结构 -->

# 目录结构

## SimpleAdmin后端目录说明 📚

```txt
api
├─.template.config                     # 重命名模版配置
├─SimpleAdmin.Application              # 应用层
│  │  Application.Development.json     # 应用层开发环境配置
│  │  Application.Production.json      # 应用层生产环境配置
│  │  GlobalUsings.cs                  # 全局引用
│  │  Startup.cs                       # 启动类
│  ├─Const                             # 常量
│  ├─Entity                            # 实体类
│  ├─Options                           # 配置转实体
│  └─Services                          # 服务
│                      
├─SimpleAdmin.Cache                    # 缓存层
│  │  Cache.Development.json           # 缓存层开发环境配置
│  │  Cache.Production.json            # 缓存层生产环境配置
│  │  GlobalUsing.cs                   # 全局引用	
│  │  Startup.cs                       # 启动类
│  ├─Const                             # 常量
│  ├─Interface                         # 接口
│  ├─Options                           # 配置转实体
│  └─Service                           # 服务
│          
├─SimpleAdmin.Core                     # 核心层
│  │  Core.Development.json            # 核心层开发环境配置
│  │  Core.Production.json             # 核心层生产环境配置
│  │  GlobalUsings.cs                  # 全局引用
│  │  Startup.cs                       # 启动类
│  ├─Attributes                        # 特性
│  ├─BaseInput                         # 输入基类
│  ├─BaseOutput                        # 输出基类
│  ├─Components                        # 组件
│  ├─Const                             # 常量
│  ├─Dto                               # Dto
│  ├─Enum                              # 枚举
│  ├─Extension                         # 扩展类
│  ├─Options                           # 配置转实体
│  ├─UnifyResult                       # 统一返回
│  └─Utils                             # 常用工具类
├─SimpleAdmin.Plugin                   # 放置插件
│  └─SimpleAdmin.Plugin.Aop            # Aop插件
│      │  GlobalUsing.cs               # 全局引用
│      ├─Aop                           # Aop
│      ├─Attributes                    # 特性
├─SimpleAdmin.SqlSugar                 # SqlSugar插件
│  │  GlobalUsing.cs                   # 全局引用
│  │  SqlSugar.Development.json        # SqlSugar开发环境配置
│  │  SqlSugar.Production.json         # SqlSugar生产环境配置
│  │  Startup.cs                       # 启动类
│  ├─Const                             # 常量
│  ├─Db                                # 数据库
│  ├─Dto                               # Dto
│  ├─Entity                            # 实体
│  ├─Extension                         # 扩展
│  └─Utils                             # 工具         
├─SimpleAdmin.System                   # 系统层
│  │  GlobalUsings.cs                  # 全局引用
│  │  Mapper.cs                        # 关系映射
│  │  Startup.cs                       # 启动类
│  │  System.Development.json          # 系统层开发环境配置
│  │  System.Production.json           # 系统层生产环境配置
│  ├─Attributes                        # 特性
│  ├─Const                             # 常量 
│  ├─Entity                            # 实体 
│  ├─EventSubscriber                   # 事件订阅
│  ├─ExtJson                           # Json扩展
│  ├─Options                           # 配置转实体
│  ├─Oss                               # 对象存储
│  ├─SeedData                          # 种子数据
│  ├─Services                          # 服务
├─SimpleAdmin.Web.Core                 # Web核心层
│  │  GlobalUsing.cs                   # 全局引用
│  │  Startup.cs                       # 启动类
│  │  Web.Development.json             # Web开发环境配置
│  │  Web.Production.json              # Web生产环境配置
│  ├─Components                        # 组件
│  ├─Controllers                       # 控制器
│  ├─Filter                            # 过滤器
│  ├─Handlers                          # 处理器 
│  ├─Logging                           # 日志
│  ├─Middleware                        # 中间件
│  └─Options                           # 配置转实体
└─SimpleAdmin.Web.Entry                # Web入口层
    │  appsettings.json                # 配置文件
    │  ip2region.xdb                   # ip2region数据库 
    │  Program.cs                      # 入口类
```
