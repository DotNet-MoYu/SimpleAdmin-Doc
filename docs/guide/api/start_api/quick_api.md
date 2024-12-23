<!-- 快速上手 -->

# 快速上手
本文会帮助你从头启动、搭建此项目

## 环境准备

本地环境需要安装:
- [Vs2022](https://visualstudio.microsoft.com/zh-hans/downloads/)/[Rider](https://www.jetbrains.com/rider/download/)
- [.NET6](https://dotnet.microsoft.com/zh-cn/download/dotnet/6.0)
- [.NET7](https://dotnet.microsoft.com/zh-cn/download/dotnet/7.0)
- [.NET8](https://dotnet.microsoft.com/zh-cn/download/dotnet/8.0)

## 代码拉取

### 从 Gitee 拉取代码：

```bash
# 克隆代码
git clone https://gitee.com/dotnetmoyu/SimpleAdmin.git
```

### 从 GitHub 拉取代码：

```bash
# 克隆代码
git clone https://github.com/DotNet-MoYu/SimpleAdmin.git
```
## 启动项目

### 打开项目
vs2022打开项目，等待项目加载nuget包,重新生成解决方案,没有错误提示，表示项目加载完成。
![shengcheng.png](/startapi/shengcheng.png)

### 修改数据库连接字符串
打开项目`SimpleAdmin.SqlSugar`,找到 `SqlSugar.Development.json`配置文件,修改自己需要的数据库配置。初始化数据库表结构和种子数据放到了各业务层配置
![sjkpz.png](/startapi/sjkpz.png)

在需要初始化表结构和种子数据的业务层种找到对应的配置，选择是否初始化。
![chushihua.png](/startapi/chushihua.png)

::: warning 

- 如果是Mysql记得字符集要是utf8mb4,改完之后记得清理解决方案！
- 如果修改了`ConfigId`,则数据库实体上对应的常量也要改,默认在常量`SqlugarConst.DB_Default`
:::

### 缓存配置
::: tip 提示
- 系统默认为内存缓存，但是推荐使用`Redis`进行开发，如需使用Redis，需要打开`SimpleAdmin.Plugin.Cache`插件，修改`Cache.Development.json`配置文件。
- Redis如果没有密码，可以不填写密码，如果有密码，需要填写密码。
:::
![huancun.png](/startapi/huancun.png)

### 启动项目
设置项目SimpleAdmin.Web.Entry为启动项，直接运行，系统会自动生成数据库、表和种子数据，并监听5566端口，控制台出现以下提示。
![qidong.png](/startapi/qidong.png)

浏览器输入http://localhost:5566如能正常显示Swagger，则表示启动成功。
![5566.png](/startapi/5566.png)

### 自定义端口
如需自定义监听端口，只需要修改`SimpleAdmin.Web.Entry`项目下的`appsettings.json`配置文件
![zdydk.png](/startapi/zdydk.png)

如果需要浏览器自动打开swagger则需要将`Properties`目录下的`launchSettings.json`中的端口改成和配置文件中的一样
![swagger.png](/startapi/swagger.png)

## 重命名项目
SimpleAdmin是一个通用的后台管理系统，这就表示它可能会被用于各种不同的系统中，不同系统的项目命名肯定是不一样的。这就需要能够快速的修改项目名称，而且修改之后要保证项目的可运行性，考虑到这一点，所以我将系统命名为`SimpleAdmin`而不是`Simple.Admin`。通过创建项目模板，能够非常容易的修改项目名称，而不是通过全局替换这种非常蠢得方式。

### 创建模块
系统已经内置好了创建模板的命令，只需找到后端项目目录api文件下的`创建模板命令.txt` 并打开。
![chuangjianmoban.png](/startapi/chuangjianmoban.png)

打开txt可以看到，改文件有三个命令，第一个是安装模板，第二个是卸载模板，第三个是根据模板创建自己的项目。
```bash
dotnet new -i SimpleAdmin //安装
dotnet new -u SimpleAdmin //卸载
dotnet new simpleadmin-n  xx  //创建项目 xx为项目名称
```

### 安装模版
项目api文件下打开`cmd`，执行命令`dotnet new -i SimpleAdmin`
![anzhuangmoban.png](/startapi/anzhuangmoban.png)

::: warning 注意
注意cmd的路径必须在txt文件的目录，并且项目没有启动过，不然sqlite数据库会报权限问题
:::

### 通过模板创建项目
在你要创建项目的文件夹中打开cmd，输入`dotnet new simpleadmin -n  xx` xx为你要创建的项目名称。
![mobanchuangjian.png](/startapi/mobanchuangjian.png)

可以看到已经成功创建了项目
![mobanchuangjian2.png](/startapi/mobanchuangjian2.png)

vs打开项目直接运行，成功启动
![mobanchuangjian3.png](/startapi/mobanchuangjian3.png)

