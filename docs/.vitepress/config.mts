import mdItCustomAttrs from "markdown-it-custom-attrs";
import {defineConfig} from "vitepress";
import {set_sidebar} from "../guide/set_sidebar.mjs";

export default defineConfig({
	base: "/simpleadmin-doc",
	title: "SimpleAdmin",
	lang: "zh-CN",
	description: "SimpleAdmin 官方文档",
	head: [
		["meta", {name: "author", content: "少林寺驻北固山办事处大神父王喇嘛"}],
		["meta", {name: "keywords", content: "SimpleAdmin,"}],
		["link", {rel: "icon", href: "icon.png"}],
		["link", {rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css"}],
		["script", {src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js"}],
	],
	markdown: {
		theme: 'github-dark',
		lineNumbers: true,
		config: (md) => md.use(mdItCustomAttrs, "image", {"data-fancybox": "gallery"})
	},
	lastUpdated: true,
	themeConfig: {
		logo: "/icon.png",
		//搜索
		search: {
			provider: "local"
		},
		outline: {
			level: [2, 4], // 显示2-4级标题
			// level: 'deep', // 显示2-6级标题
			label: '当前页大纲' // 文字显示
		},
		// algolia: {
		//     appId: "xxx",
		//     apiKey: "xxx",
		//     indexName: "SimpleAdmin",
		// },
		editLink: {
			text: "为此页提供修改建议",
			pattern: "https://gitee.com/dotnetmoyu/SimpleAdmin-Doc",
		},
		socialLinks: [{icon: "github", link: "https://gitee.com/dotnetmoyu/SimpleAdmin"}],
		footer: {
			message: "MIT License.",
			copyright: "Copyright © 2024 少林寺驻北固山办事处大神父王喇嘛",
		},
		nav: [
			{text: "指引", link: "/guide/introduce/introduce/introduce", activeMatch: "/guide/introduce/"},
			{
				text: "文档",
				items: [
					{
						text: "前端文档",
						link: "/guide/web/start_web/intro_web", activeMatch: "/guide/web/"
					},
					{
						text: "后端文档",
						link: "/guide/api/start_api/intro_api", activeMatch: "/guide/api/"
					},
				]
			},
			{
				text: "相关链接",
				items: [
					{
						text: "Github 仓库",
						link: "https://github.com/DotNet-MoYu/SimpleAdmin"
					},
					{
						text: "Gitee 仓库",
						link: "https://gitee.com/dotnetmoyu/SimpleAdmin"
					},
					{
						text: "预览地址",
						link: "http://153.101.199.83:12802"
					},
					{
						text: "文档源码",
						link: "https://gitee.com/dotnetmoyu/SimpleAdmin-Doc"
					},
				]
			},
			{text: "🍵 赞助", link: "/sponsor/index"},
		],

		sidebar: {
			"/guide/introduce/": set_sidebar('/guide/introduce', false),
			"/guide/web/": set_sidebar('/guide/web', false),
			"/guide/api/": set_sidebar('/guide/api', false),
		},
	},
	vite: {
		plugins: [],
	},
});
