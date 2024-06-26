<!-- 架构设计 -->

# 架构设计
`SimpleAdmin`作为一个以小而美为目标的框架，轻量、灵活、高效一直是设计的目标，在经历过多个版本的迭代之后，框架的设计也逐渐趋于稳定。`插件式开发`成为了SimpleAdmin的核心设计理念，每一个插件都是独立的,包含实体、种子数据和service类等，主项目需要的时候只需要引用到项目中来就行了。

## 项目结构
项目结构主要分为架构核心、系统插件、业务模块和应用服务，如图所示:

![xiangmujiegou.png](/design/xiangmujiegou.png)

## 分层说明

### 架构核心
存放系统核心库，如通用类，缓存，orm实现，这些都是系统基础，作为系统的架构核心再合适不过。
### 系统插件
存放系统插件库,每一个插件都是独立的库，插件可以引用`System`项目也可以被`System`项目引用
### 业务模块
存放业务代码库，目前只有`System`和`Application`，我们主要在这两个库里写业务
### 应用服务
存放应用程序入口库,一个项目可能有多个项目入口，比如有api，有定时任务等等，api也可能会拆分成几个，所以这里存放程序的入口，需要什么插件或者库直接引用就行。


## 架构简单示意图
![shiyitu.png](/design/shiyitu.png)
