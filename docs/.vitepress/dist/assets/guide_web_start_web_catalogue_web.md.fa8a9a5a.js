import{_ as s,S as n,N as a,Q as e}from"./chunks/framework.e194ce62.js";const d=JSON.parse('{"title":"目录结构","description":"","frontmatter":{},"headers":[],"relativePath":"guide/web/start_web/catalogue_web.md","filePath":"guide/web/start_web/catalogue_web.md","lastUpdated":1712043550000}'),l={name:"guide/web/start_web/catalogue_web.md"},p=e(`<h1 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h1><h2 id="simpleadmin前端目录说明-📚" tabindex="-1">SimpleAdmin前端目录说明 📚 <a class="header-anchor" href="#simpleadmin前端目录说明-📚" aria-label="Permalink to &quot;SimpleAdmin前端目录说明 📚&quot;">​</a></h2><div class="language-txt line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#e1e4e8;">web</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ .husky                 # husky 配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ .vscode                # VSCode 推荐配置</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ build                  # Vite 配置项</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ public                 # 静态资源文件（该文件夹不会被打包）</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ src</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ api                 # API 接口管理</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ assets              # 静态资源文件</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ components          # 全局组件</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ config              # 全局配置项</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ directives          # 全局指令文件</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ enums               # 项目常用枚举</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ hooks               # 常用 Hooks 封装</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ layouts             # 框架布局模块</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ routers             # 路由管理</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ stores              # pinia store</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ styles              # 全局样式文件</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ typings             # 全局 ts 声明</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ utils               # 常用工具库</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ views               # 项目所有页面</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ App.vue             # 项目主组件</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ auto-import.d.ts    # 自动导入文件</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ├─ main.ts             # 项目入口文件</span></span>
<span class="line"><span style="color:#e1e4e8;">│  └─ vite-env.d.ts       # 指定 ts 识别 vue</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ .editorconfig          # 统一不同编辑器的编码风格</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ .env                   # vite 常用配置</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ .env.development       # 开发环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ .env.production        # 生产环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ .env.test              # 测试环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ .eslintignore          # 忽略 Eslint 校验</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ .eslintrc.cjs          # Eslint 校验配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ .gitignore             # 忽略 git 提交</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ .prettierignore        # 忽略 Prettier 格式化</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ .prettierrc.cjs        # Prettier 格式化配置</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ .stylelintignore       # 忽略 stylelint 格式化</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ .stylelintrc.cjs       # stylelint 样式格式化配置</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ commitlint.config.cjs  # git 提交规范配置</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ components.d.ts        # 全局组件声明</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ index.html             # 入口 html</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ LICENSE                # 开源协议文件</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ lint-staged.config.cjs # lint-staged 配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ package-lock.json      # 依赖包包版本锁</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ package.json           # 依赖包管理</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ postcss.config.cjs     # postcss 配置</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ README.md              # README 介绍</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ tsconfig.json          # typescript 全局配置</span></span>
<span class="line"><span style="color:#e1e4e8;">└─ vite.config.ts         # vite 全局配置文件</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div>`,3),r=[p];function c(i,t,o,b,u,m){return n(),a("div",null,r)}const g=s(l,[["render",c]]);export{d as __pageData,g as default};
