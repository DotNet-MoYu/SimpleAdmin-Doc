import{_ as a,S as e,N as i,Q as o}from"./chunks/framework.f9c570e8.js";const t="/simpleadmin-doc/design/xiangmujiegou.png",r="/simpleadmin-doc/design/shiyitu.png",_=JSON.parse('{"title":"架构设计","description":"","frontmatter":{},"headers":[],"relativePath":"guide/api/design/framework.md","filePath":"guide/api/design/framework.md","lastUpdated":1713430192000}'),d={name:"guide/api/design/framework.md"},n=o('<h1 id="架构设计" tabindex="-1">架构设计 <a class="header-anchor" href="#架构设计" aria-label="Permalink to &quot;架构设计&quot;">​</a></h1><p><code>SimpleAdmin</code>作为一个以小而美为目标的框架，轻量、灵活、高效一直是设计的目标，在经历过多个版本的迭代之后，框架的设计也逐渐趋于稳定。<code>插件式开发</code>成为了SimpleAdmin的核心设计理念，每一个插件都是独立的,包含实体、种子数据和service类等，主项目需要的时候只需要引用到项目中来就行了。</p><h2 id="项目结构" tabindex="-1">项目结构 <a class="header-anchor" href="#项目结构" aria-label="Permalink to &quot;项目结构&quot;">​</a></h2><p>项目结构主要分为架构核心、系统插件、业务模块和应用服务，如图所示:</p><p><img src="'+t+'" alt="xiangmujiegou.png" data-fancybox="gallery"></p><h2 id="分层说明" tabindex="-1">分层说明 <a class="header-anchor" href="#分层说明" aria-label="Permalink to &quot;分层说明&quot;">​</a></h2><h3 id="架构核心" tabindex="-1">架构核心 <a class="header-anchor" href="#架构核心" aria-label="Permalink to &quot;架构核心&quot;">​</a></h3><p>存放系统核心库，如通用类，缓存，orm实现，这些都是系统基础，作为系统的架构核心再合适不过。</p><h3 id="系统插件" tabindex="-1">系统插件 <a class="header-anchor" href="#系统插件" aria-label="Permalink to &quot;系统插件&quot;">​</a></h3><p>存放系统插件库,每一个插件都是独立的库，插件可以引用<code>System</code>项目也可以被<code>System</code>项目引用</p><h3 id="业务模块" tabindex="-1">业务模块 <a class="header-anchor" href="#业务模块" aria-label="Permalink to &quot;业务模块&quot;">​</a></h3><p>存放业务代码库，目前只有<code>System</code>和<code>Application</code>，我们主要在这两个库里写业务</p><h3 id="应用服务" tabindex="-1">应用服务 <a class="header-anchor" href="#应用服务" aria-label="Permalink to &quot;应用服务&quot;">​</a></h3><p>存放应用程序入口库,一个项目可能有多个项目入口，比如有api，有定时任务等等，api也可能会拆分成几个，所以这里存放程序的入口，需要什么插件或者库直接引用就行。</p><h2 id="架构简单示意图" tabindex="-1">架构简单示意图 <a class="header-anchor" href="#架构简单示意图" aria-label="Permalink to &quot;架构简单示意图&quot;">​</a></h2><p><img src="'+r+'" alt="shiyitu.png" data-fancybox="gallery"></p>',16),s=[n];function c(l,h,p,m,u,f){return e(),i("div",null,s)}const b=a(d,[["render",c]]);export{_ as __pageData,b as default};
