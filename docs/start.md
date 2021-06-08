---
order: 1
title: 如何开始
type: 开发
---

## 启动

在页面渲染前，我们需要预先取得数据帮助页面渲染，例如菜单数据、用户数据等。对于vue而言，调用`mount('#app')`才开始从根结点渲染，所以可以这么做：
```
const app = createApp(App);
startupService.load().then(() => {
	app.mount("#app");
})
.catch((error) => {
	console.error(`挂载失败：${error}`);
});
```
预先取得的数据可以存放到`@balzes/theme/setting.service`中，当前支持应用信息、用户信息和项目信息。

## 自定义

因为项目建立在克隆脚手架上，所以有些名称需要手动去更改以便合适项目。
| 作用 | 位置 |
|----|----|
| 页面标题 | vue.config.js文件中args[0].title |
| 页面图标 | 替换public文件夹下的favicon.ico |
| 顶部未折叠时候的项目名称 | src/layout/header/logo/index.vue |
| 启动端口 | vue.config.js文件中devServer.port |

## 菜单栏

菜单信息放在`public/resource/app-data.json`中，并通过`@blazes/theme/menu-service`处理。

如果需要图标支持，请在`plugins/icon`文件下添加组件。
考虑到侧边栏会有自己的功能扩展，如压测系统会在侧边底部添加使用手册链接，所以并未集成到`@blazes/abc`组件库中，在修改侧边栏组件时候慎重。

除此之外，`resource`文件夹下的获取，都会添加`Cache-Control": "no-store`头部信息，防止被浏览器缓存。