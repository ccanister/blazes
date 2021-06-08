---
order: 3
title: 与服务端交互
type: 开发
---

脚手架采用了`axios`库发起 ajax 请求，并封装了`RequestService`，方便添加拦截器。使用时实例化 `RequestService` 即可。

```
const instance = new RequestService({
  baseURL: env.baseUrl,
  withCredentials: true,
  timeout: 3000,
}).instance;
```

## 拦截器

现在提供的拦截器有以下几个

- deDuplication：取消在同一时间内发起的相同请求，减少 http 请求。相同请求的意思是参数也是一致的。
- useCsrf：添加 csrf 头部信息。中台使用了 django 框架，认证的时候需要该信息，其实就是从 cookie 中读取值再写入到 `X-CSRFToken` 中。
  u- seBtnLoading：当发起 post 等请求时候，按钮会出现 loading 状态，防止用户重复点击。

最后，自定义拦截器对返回的数据添加统一处理，例如服务端返回的数据格式。

```Javascript
{
  code: 0
  msg: "",
  data: {}
}
```

code 为 0 的时候，说明返回数据正常，只要读取 data 字段即可，否则读取 msg 字段反馈给用户。

```Typescript
instance.interceptors.response.use((response: AxiosResponse<any>) => {
    const config = response.config;
    const { baseURL } = config;
    if (baseURL?.startsWith("/resource")) {
      // 请求静态资源时候不再判断状态码
      return Promise.resolve(response.data);
    }
    const { code = -1, data = {} } = response.data;
    const { msg = "" } = response.data;
    switch (code) {
      case HttpCode.Ok:
        return Promise.resolve(data);
    }
    return Promise.reject(msg);
  },
  (error) => {
    const { status = 500, data = {} } = error.response || {};
    let msg = data.msg || error.message;
    if (msg.startsWith("timeout")) {
      message.error("请求超时，请稍微再试");
      return;
    }
    switch (status) {
      case HttpCode.ServerError:
        msg = "服务器内部错误";
        break;
    }
    return Promise.reject(msg);
  }
);
```

注意的是，如果是读取静态资源文件，那么直接返回数据即可，不要再做多余判断。以上只是和服务端约定的格式风格，具体可以自己把握。

## 开发环境

如果后端还未开发完，但已经提供了接口格式，可以利用 `MockJs` 去模拟请求。脚手架在 `main.ts` 中会在开发环境中加载，如果已经后端已经开发完成，可以直接注释该部分代码，或者对应的请求部分。

```
if (isDevelopment()) {
  require("../mock"); // mock数据用，正式环境删除
}
```

## 跨域
前后端分离的情况下，会导致对后端发送请求时候收到跨域的报错

```
Access to XMLHttpRequest at 'x x x' from origin 'http://localhost:8081' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

最简单的方法是在根目录下的 vue.config.js 下配置代理

```JavaScript
devServer: {
    proxy: {
        "/api": {
        target: "http://10.10.13.12:9090/", // 代理
        changeOrigin: true,
        pathRewrite: {
            "^/api": "/api",
        },
        },
    },
},
```

假设后端服务都是以`/api`作为前缀，那么当发起`/api/project` 请求时候会被转发到`http://10.10.13.12:9090/api/project`。 
所以后端的服务需要以某个单词作为前缀，方便做代理配置。
