<!-- 网络请求 -->

# 网络请求

- 项目封装了`Axios`来做网络请求，包括请求 Loading、错误处理、取消请求等功能
- 可以按照自己项目需求来进行封装

## 目录结构

```txt
├─ api                       # 网络请求文件夹
├ ├─helper                   # 辅助函数：错误处理、取消请求
├ ├ ├─axiosCancel.ts         # 取消请求函数
├ ├ ├─checkStatus.ts         # 检查请求返回的状态
├ ├─interface                # api接口的请求参数和返回数据的类型定义文件夹
├ ├─modules                  # 请求函数模块，强烈建议根据不同的模块创建不同的请求文件
├ ├─request                  # 请求函数模块，强烈建议根据不同的模块创建不同的请求文件
├ ├ ├─instance.ts            # 封装 axios 请求类
├ ├ ├─request.ts             # 封装后的q请求类
└─
```
## 配置

> 不出意外的话，你应该要修改请求的`baseURL`。

在`index.ts`文件的 15 行你可以看到一个默认的基础配置

```ts
const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === "true"; // 是否使用代理
const url = import.meta.env.VITE_API_URL as string; // 请求地址

/**
 * @description 模块内的请求, 会自动加上模块的前缀
 * @param moduleUrl 模块地址
 * @param prefix  前缀
 */
export const moduleRequest = (moduleUrl: string, prefix: string = "/api") =>
	createRequest({
		//请求地址,可在 .env.** 文件中修改
		baseURL: isHttpProxy ? prefix + moduleUrl : url + prefix + moduleUrl,
		// 设置超时时间
		timeout: ResultEnum.TIMEOUT as number,
		// 跨域时候允许携带凭证
		withCredentials: true
	});
```

你可以在此处修改或添加 axios 的基本配置。

:::warning 提示
`baseURL`是通过环境变量加载的，可以通过项目根目录下的`.env.***`文件中修改`VITE_API_URL`，而不是在此处直接修改。
:::

## 请求代理

:::tip 提示
在之前使用其他admin的时候，经常会有人再部署的时候会遇到这么一个问题:明明在生产环境中配置了后端的api地址，但是通过nginx部署之后，请求的确是本地的地址。这是因为在项目中配置了代理，部署之后所有的请求都走了代理导致配置文件地址失效,关于vite代理说明，请自行百度，针对这种情况，本系统通过开关的方式让开发者自行选择是否走代理。
:::

> 在`.env.***`文件中配置`VITE_HTTP_PROXY`为`true`，即可开启代理，否则关闭代理。
``` bash
# 否开启代理
VITE_HTTP_PROXY=true
```

## 请求拦截

代码位置：`instance.ts 58:104`

```ts
    /**
 * @description 请求拦截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器
 * token校验(JWT) : 接受服务器返回的 token,存储到 vuex/pinia/本地储存当中
 */
this.service.interceptors.request.use(
	(config: CustomAxiosRequestConfig) => {
		const userStore = useUserStore();
		// 重复请求不需要取消，在 api 服务中通过指定的第三个参数: { cancel: false } 来控制
		config.cancel ?? (config.cancel = true);
		config.cancel && axiosCanceler.addPending(config);
		// 当前请求不需要显示 loading，在 api 服务中通过指定的第三个参数: { loading: false } 来控制
		config.loading ?? (config.loading = true);
		config.loading && showFullScreenLoading();
		//检查 config.headers 对象是否存在以及是否具有 set 方法
		if (config.headers && typeof config.headers.set === "function") {
			const { accessToken, refreshToken } = userStore;
			if (accessToken) {
				config.headers.set(TokenEnum.TOKEN_NAME, TokenEnum.TOKEN_PREFIX + accessToken);
				// 判断 accessToken 是否过期
				const jwt = this.decryptJWT(accessToken);
				const exp = this.getJWTDate(jwt.exp);
				// token 已经过期
				if (new Date() >= exp) {
					// 获取刷新 token
					const refreshAccessToken = refreshToken;
					// 携带刷新 token
					if (refreshAccessToken) {
						config.headers.set("X-" + TokenEnum.TOKEN_NAME, TokenEnum.TOKEN_PREFIX + refreshAccessToken);
					}
				}
			}
		}
		// get请求加时间戳
		if (config.method === "get") {
			config.params = {
				...config.params,
				_t: new Date().getTime()
			};
		}
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);
```
- 在请求之前检查当前请求需不需要全局的 loading，并且在 header 请求头中携带`accessToken`和`refreshToken`。

## 响应拦截

代码位置：`instance.ts 110:157`

```typescript
 /**
 * @description 响应拦截器
 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
 */
this.service.interceptors.response.use(
	(response: AxiosResponse) => {
		// 检查并存储授权信息
		this.checkAndStoreAuthentication(response);
		const { data, config } = response;
		const userStore = useUserStore();
		axiosCanceler.removePending(config);
		tryHideFullScreenLoading();
		// 登录失效
		if (data.code == ResultEnum.OVERDUE) {
			userStore.clearUserStore();
			router.replace(LOGIN_URL);
			ElMessage.error(data.msg);
			return Promise.reject(data);
		}
		// 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
		if (data.code && data.code !== ResultEnum.SUCCESS) {
			ElMessage.error(data.msg);
			return Promise.reject(data);
		} else {
			// 统一成功提示
			const responseUrl: string = response.config.url || ""; //获取请求地址
			this.apiNameArray.forEach(apiName => {
				let responseApiArray = responseUrl.split("/"); //分割
				let method = responseApiArray[responseApiArray.length - 1]; //取最后一个
				let result = this.noMessageApiNameArray.includes(method); //判断是否在不提示的数组中
				if (!result && responseUrl.includes(apiName)) {
					//如果不在不提示的数组中并且请求地址包含指定的方法
					ElMessage.success(data.msg);
				}
			});
		}
		// 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
		return data;
	},
	async (error: AxiosError) => {
		const { response } = error;
		tryHideFullScreenLoading();
		// 请求超时 && 网络错误单独判断，没有 response
		if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
		if (error.message.indexOf("Network Error") !== -1) ElMessage.error("网络错误！请您稍后重试");
		// 根据服务器响应的错误状态码，做不同的处理
		if (response) checkStatus(response.status);
		// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
		if (!window.navigator.onLine) router.replace("/500");
		return Promise.reject(error);
	}
);
```

- 在获取到接口的响应后，不管成功或失败，先尝试关闭全局 loading`tryHideFullScreenLoading`，然后根据成功或失败做不同的处理。

:::warning 注意
这里的请求成功指的是**网络请求**，不是**业务逻辑**成功。
:::

- 请求成功后会判断接口返回的响应数据里的 code。根据不同的 code 做不同的处理。
	这里要注意`ResultEnum`中定义的 code 是不是跟你业务上的 code 一样。

- 请求失败也是一样，只不过这里的失败是指网络失败。网络请求失败后服务器返回的状态码都是有迹可循的，只需要根据不同的状态码，做不同的处理。这就是`checkStatus`的工作。

## 示例

> 现在要写一个登录接口

1. api->interface->sys->auth 中新建一个`login.ts`文件,用来定义接口数据类型。
```typescript jsx
export namespace Login {
	/**
	 * 验证码
	 */
	interface ValidCode {
		/**  验证码 */
		validCode: string;
		/** 验证码请求号 */
		validCodeReqNo: string;
	}

	/**
	 * 账号密码登录表单
	 */
	export interface LoginForm extends ValidCode {
		account: string;
		password: string;
		tenantId?: number | string;
	}
}
```
2. api->modules->sys->auth 中新建一个`login.ts`文件并引入封装后的 axios。
```typescript jsx

import { Login } from "@/api/interface";
import { moduleRequest } from "@/api/request";
const http = moduleRequest("/sys/auth/b/");
```

4. 编写请求函数,可以给请求函数的入参和返回值加上 TS 类型限制。。
```typescript jsx
const loginApi = {
  /** 用户登录 */
  login(params: Login.LoginForm) {
    return http.post<Login.Login>("login", params, { loading: false }); // 正常 post json 请求  =  application/json
  },
};

export { loginApi };
```
5. 在需要的地方引入并使用
```typescript jsx
import {Login, loginApi } from "@/api";
// 表单数据
const loginForm = reactive<Login.LoginForm>({
	account: "superAdmin", //用户名
	password: "123456", // 密码
	validCode: "", // 验证码
	validCodeReqNo: "", // 验证码请求号
	tenantId: config.tenantIdGet
});

const login = async () => {
	// 如果请求成功，那么就会执行下面的代码。基本上不需要错误处理，错误情况都被拦截了
	// 除非你有需要，你可以使用`.catch`
	// const data = await loginApi(form).catch((err)=>{
	// 错误处理
	// })
	// 登录接口
	await loginApi
		.login(model)
		.then(res => {
			if (res.data) {
				this.loginSuccess(res.data); //登录成功,保存token，跳转页面等操作
			}
		})
		.catch(err => {
			return Promise.reject(err);
		})
		.finally(() => {
			this.loginLoading = false;
		});

};
```
