---
order: 2
title: 体系结构
type: 入门
---

## 结构图

技术栈基于 TypeScript 语言、Vue 框架和 Ant Design Vue 组件库，所以在使用脚手架的时候，需要提前了解相关知识。

- [TypeScript](https://www.tslang.cn/docs/home.html)中文文档，该语言和 Java 很像，属于面向对象，如果不好把握类型，直接 any 替代，当然这也不推荐。
- [Vue](https://vue3js.cn/docs/zh/guide/introduction.html)中文文档，至少阅读完教程的介绍篇幅。
- [Ant Design Vue](https://2x.antdv.com/docs/vue/introduce-cn)，基础组件库。

当前脚手架建立在 blazes 类库之上，可以先了解其包含哪些东西，在工程的 package.json 中看到我们使用的类库。
| 类库 | 描述 |
|----|----|
| **@blazes/theme** | 主题系统包含常用的样式，和一些通用的服务、指令等。 |
| **@blazes/abc** | 抽象出的业务组件，包含表格等。 |
| **@blazes/cache** | 可以将数据缓存到内存或者 localstorage |
| **@blazes/utils** | 包含数组、DOM 等工具集 |

## 目录结构

现在行业内没有 vue3 的最佳实践，个人结合其他框架的开发经验认为比较好的目录结构如下：

```
├── mock                                     # mock数据相关
├── public
|	├── resource		                     # 存放静态资源，如网站帮助手册等
├── src
│   ├── assets								 # 也是静态资源，区别在于public里的资源会直接拷贝，也可以在浏览器的url中打开
│   ├── compoennts							 # 会被多次使用到的组件
│   ├── directives							 # 指令
│   ├── layout                               # 通用布局
│   ├── plugins								 # 插件，组件注册尽量实现按需加载
│   │   ├── antd						     # 注册antd design相关组件
│   │   ├── blazes							 # 注册@blazes/abc相关组件
│   │   ├── icon							 # 使用到的图表
│   ├── router
│   ├── types                                # 存放类型，包括和服务端交互
│   ├── utils                                # 工具集
│   │   ├── api.service.ts                   # dao层
│   │   ├── env                              # 不同环境的变量
│   │   ├── startup.service.ts               # 初始化项目配置
│   ├── views                                # 业务路由指向的组件，名称区分业务，再存放不同功能的页面
│   │   ├── page1
│   │   │   ├── list
│   │   │   |		├── index.vue
│   │   │   ├── add
│   │   │   ├── add
├── .env.*
├── deploy_web.sh							  # 部署脚本
```
