<!-- CodeFirst  -->

# CodeFirst

## 介绍
传统开发中，通常采用DbFirst的方式开发，先有数据库和表，再将对应的表转为实体。随着技术的发展，开始有了CodeFist的方式开发，先创建实体类，再通过实体类反向的创建数据库和表结构，微软的EF框架就是典型，本系统使用的ORM是SqlSugar，同样也支持CodeFisrt，详情可以查看文档[SqlSugar文档](https://www.donet5.com/Doc/1/1206)。

## WebFirst
WebFirst  是果糖大数据团队开发的新一代 高性能 代码生成器&数据库设计工具，由.net core 3.1 + sqlsugar 开发 导入1000个表只要1-2秒，用法简单，功能强大，支持多种数据库 ，具体功能如下：

- 建库、CodeFirst方式在线建表，没用到CodeFirst的用户可以用工具轻松体验，支持公共字段
- 导出EXCEL文档，把每个表的数据导出来
- 模版管理 可以自个添加修改模版，使用的是Razor模版引擎对C#程序员更加友好
- 方案管理，可以创建自已的生成方案，修改方案
- 支持扩展模版属性，支持生成更加丰富的前端代码
- 支持生成解决方案
- 支持生成附加文件，支持文件后缀
- 支持视图
- 支持自定义数据类型
- 支持多种数据库 MYSQL PGSQL SQLITE SQLSERVE  ORCLE  达梦

![WebFirst](/startapi/webfirst.png)

::: tip 提示
- WebFist参考文档 [https://www.donet5.com/Doc/11](https://www.donet5.com/Doc/11)
:::

## 生成实体类
采用webfirst生成实体类，具体用法不阐述，参考webfirst文档，在`自定义模板`->`模板管理`菜单里新建一个模板，下面是我的模板，可以根据情况修改

```csharp
namespace @Model.name_space
{
    /// <summary>
    /// @((Model.Description+"").Replace("\r","").Replace("\n",""))
    ///</summary>
    [SugarTable("@(Model.TableName)",TableDescription ="@((Model.Description+"").Replace("\r","").Replace("\n",""))")]
    [Tenant(SqlsugarConst.DB_Default)]
    [CodeGen]
    public class @(Model.ClassName): DataEntityBase
    {
    @foreach (var item in Model.PropertyGens)
    {
    var isPrimaryKey = item.IsPrimaryKey ? ",IsPrimaryKey = true" : "";
    var isIdentity = item.IsIdentity ? ",IsIdentity = true" : "";
    var isNull=(item.IsNullable&&item.Type!="string"&&item.IsSpecialType==false&&item.Type!="byte[]")?"?":"";
    var isIgnore=(item.IsIgnore?",IsIgnore = true":"");
    var isJson=(item.CodeType.StartsWith("json")?",IsJson= true":"");
    var Length=item.Length==null?"":$",Length= {item.Length}";
    var isnullable=item.IsNullable?"true":"false";    
    var DecimalDigits=item.DecimalDigits==null?"":$",DecimalDigits= {item.DecimalDigits}";
    //var name = item.DbColumnName.ToLower();
    //var list = name .Split("_");
   //for (int i = 0; i < list.Length; i++)
   // {
    //var str = list[i];
   // var c = str.Substring(0, 1).ToUpper() + str.Substring(1);
   // list[i] = c;
  //  }
    //var column = string.Join("", list);
    var column=item.DbColumnName;
    //var column = name.Substring(0, 1).ToUpper() + name.Substring(1);
    var newPropertyName=column; //这里可以用C#处理 实体属性的显式格式
    //想和数据库一样就用 newPropertyName=item.DbColumnName
    if(System.Text.RegularExpressions.Regex.IsMatch(newPropertyName.Substring(0,1), "[0-9]"))
    {
        newPropertyName="_"+newPropertyName;//处理属性名开头为数字情况
    }
    if(newPropertyName==Model.ClassName)
    {
        newPropertyName="_"+newPropertyName;//处理属性名不能等于类名
    }

    var desc=(item.Description+"").Replace("\r","").Replace("\n","");//处理换行

    if(isIgnore!="")
    {
       isPrimaryKey =isIdentity =isNull="";
     }
        @:/// <summary>
        @:/// @(desc) 
        @if(item.DefaultValue!=null)
        {
        @:/// 默认值: @Raw(item.DefaultValue)
        }
        @:///</summary>
        @: [SugarColumn(ColumnName="@(column)",ColumnDescription ="@(desc)" @(isPrimaryKey) @(isIdentity) @(isIgnore) @(isJson) @(Length) @(DecimalDigits),IsNullable =@(isnullable))]
        @: public @Raw(item.Type)@isNull @newPropertyName{ get; set; }
    }
    }
}
```

在类建表模式中选择要生成的表，点击预览并选择模板，可以生成对应的实体类代码。SqlSugar插件中的Entity文件夹新建对应的实体类，将预览的代码复制进去,根据情况选择实体继承的类，去掉公共字段即可。
![yulan](/startapi/yulan.png)

## 生成数据库表
只需要在业务层的配置文件中设置IsInitDb为true。在启动项目时，系统会自动创建数据库表结构和种子数据。
```json
{
	//系统层设置
	"ApplicationSettings": {
		"InitTable": false, //是否初始化表结构
		"InitSeedData": false, //是否初始化种子数据
	}
}
```
系统启动时，会自动创建对应的数据库和表
![shengchengbiao](/startapi/shengchengbiao.png)

::: tip 提示
如果希望某个已经存在的表不重新初始化，只需要在实体类上加上IgnoreInitTable特性即可，系统会在初始化的时候忽略该实体。
:::

## 生成种子数据
本系统的种子数据放在对应业务层下的SeedData文件夹。Json文件夹放置了对应的种子数据，默认以seed_开头。
![zhongzi](/startapi/zhongzi.png)

json文件夹下放置的就是种子数据的json文件，可以通过Navicat导出的json文件。
![navicat](/startapi/navicat.png)

要注意时间格式要改成`YMD`
![navicatriqi](/startapi/navicatriqi.png)

::: tip 提示
- 系统启动时会自动读取种子数据类，并将数据插入到数据库中。
- 具体实现可以在SqlSugar层的`CodeFirstUtils`类中查看。
- 如果希望有些表不生成种子数据，只需要在SeedDatal类加上`IgnoreSeedDataAdd`或者`IgnoreSeedDataAddUpdate`特性即可。
:::
