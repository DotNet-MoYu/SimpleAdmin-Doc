import{_ as s,S as n,N as a,Q as e}from"./chunks/framework.f9c570e8.js";const d=JSON.parse('{"title":"目录结构","description":"","frontmatter":{},"headers":[],"relativePath":"guide/api/start_api/catalogue_api.md","filePath":"guide/api/start_api/catalogue_api.md","lastUpdated":1712043550000}'),l={name:"guide/api/start_api/catalogue_api.md"},p=e(`<h1 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h1><h2 id="simpleadmin后端目录说明-📚" tabindex="-1">SimpleAdmin后端目录说明 📚 <a class="header-anchor" href="#simpleadmin后端目录说明-📚" aria-label="Permalink to &quot;SimpleAdmin后端目录说明 📚&quot;">​</a></h2><div class="language-txt line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#e1e4e8;">api</span></span>
<span class="line"><span style="color:#e1e4e8;">├─.template.config                     # 重命名模版配置</span></span>
<span class="line"><span style="color:#e1e4e8;">├─SimpleAdmin.Application              # 应用层</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  Application.Development.json     # 应用层开发环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  Application.Production.json      # 应用层生产环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  GlobalUsings.cs                  # 全局引用</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  Startup.cs                       # 启动类</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Const                             # 常量</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Entity                            # 实体类</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Options                           # 配置转实体</span></span>
<span class="line"><span style="color:#e1e4e8;">│  └─Services                          # 服务</span></span>
<span class="line"><span style="color:#e1e4e8;">│                      </span></span>
<span class="line"><span style="color:#e1e4e8;">├─SimpleAdmin.Cache                    # 缓存层</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  Cache.Development.json           # 缓存层开发环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  Cache.Production.json            # 缓存层生产环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  GlobalUsing.cs                   # 全局引用	</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  Startup.cs                       # 启动类</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Const                             # 常量</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Interface                         # 接口</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Options                           # 配置转实体</span></span>
<span class="line"><span style="color:#e1e4e8;">│  └─Service                           # 服务</span></span>
<span class="line"><span style="color:#e1e4e8;">│          </span></span>
<span class="line"><span style="color:#e1e4e8;">├─SimpleAdmin.Core                     # 核心层</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  Core.Development.json            # 核心层开发环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  Core.Production.json             # 核心层生产环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  GlobalUsings.cs                  # 全局引用</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  Startup.cs                       # 启动类</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Attributes                        # 特性</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─BaseInput                         # 输入基类</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─BaseOutput                        # 输出基类</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Components                        # 组件</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Const                             # 常量</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Dto                               # Dto</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Enum                              # 枚举</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Extension                         # 扩展类</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Options                           # 配置转实体</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─UnifyResult                       # 统一返回</span></span>
<span class="line"><span style="color:#e1e4e8;">│  └─Utils                             # 常用工具类</span></span>
<span class="line"><span style="color:#e1e4e8;">├─SimpleAdmin.Plugin                   # 放置插件</span></span>
<span class="line"><span style="color:#e1e4e8;">│  └─SimpleAdmin.Plugin.Aop            # Aop插件</span></span>
<span class="line"><span style="color:#e1e4e8;">│      │  GlobalUsing.cs               # 全局引用</span></span>
<span class="line"><span style="color:#e1e4e8;">│      ├─Aop                           # Aop</span></span>
<span class="line"><span style="color:#e1e4e8;">│      ├─Attributes                    # 特性</span></span>
<span class="line"><span style="color:#e1e4e8;">├─SimpleAdmin.SqlSugar                 # SqlSugar插件</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  GlobalUsing.cs                   # 全局引用</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  SqlSugar.Development.json        # SqlSugar开发环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  SqlSugar.Production.json         # SqlSugar生产环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  Startup.cs                       # 启动类</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Const                             # 常量</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Db                                # 数据库</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Dto                               # Dto</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Entity                            # 实体</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Extension                         # 扩展</span></span>
<span class="line"><span style="color:#e1e4e8;">│  └─Utils                             # 工具         </span></span>
<span class="line"><span style="color:#e1e4e8;">├─SimpleAdmin.System                   # 系统层</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  GlobalUsings.cs                  # 全局引用</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  Mapper.cs                        # 关系映射</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  Startup.cs                       # 启动类</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  System.Development.json          # 系统层开发环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  System.Production.json           # 系统层生产环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Attributes                        # 特性</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Const                             # 常量 </span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Entity                            # 实体 </span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─EventSubscriber                   # 事件订阅</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ExtJson                           # Json扩展</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Options                           # 配置转实体</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Oss                               # 对象存储</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─SeedData                          # 种子数据</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Services                          # 服务</span></span>
<span class="line"><span style="color:#e1e4e8;">├─SimpleAdmin.Web.Core                 # Web核心层</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  GlobalUsing.cs                   # 全局引用</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  Startup.cs                       # 启动类</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  Web.Development.json             # Web开发环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">│  │  Web.Production.json              # Web生产环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Components                        # 组件</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Controllers                       # 控制器</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Filter                            # 过滤器</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Handlers                          # 处理器 </span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Logging                           # 日志</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─Middleware                        # 中间件</span></span>
<span class="line"><span style="color:#e1e4e8;">│  └─Options                           # 配置转实体</span></span>
<span class="line"><span style="color:#e1e4e8;">└─SimpleAdmin.Web.Entry                # Web入口层</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  appsettings.json                # 配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ip2region.xdb                   # ip2region数据库 </span></span>
<span class="line"><span style="color:#e1e4e8;">    │  Program.cs                      # 入口类</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br></div></div>`,3),r=[p];function c(i,o,t,b,m,u){return n(),a("div",null,r)}const S=s(l,[["render",c]]);export{d as __pageData,S as default};
