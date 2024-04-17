<!-- 部署 -->

# 构建和部署

## 发布项目
修改各个项目生产环境配置文件为正确的配置，然后右击项目SimpleAdmin.Web.Entry选择发布选项，配置好发布的版本和运行时，点击发布按钮即可。
![fabu.png](/startapi/fabu.png)

## IIS 部署

## 运行时配置
如果是非独立部署，或者部署在iis上，则需要安装对应sdk版本的运行时，下载地址：[.Net运行时](https://dotnet.microsoft.com/zh-cn/download/dotnet)
![yunxingshi.png](/startapi/yunxingshi.png)

## 部署到IIS

### 配置IIS
将发布之后文件夹复制到服务器，打开IIS管理器，新增一个网站。
![iis.png](/startapi/iis.png)

### 启动后端
浏览器输入iis配置的对应的后端地址，如果可以正常显示swagger则表示后端部署成功
![qidonghouduan.png](/startapi/qidonghouduan.png)

### 前端登录
前端访问登录，可以正常进入系统表示前端和后端都部署成功。
![login.png](/build/login.png)
