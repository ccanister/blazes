---
order: 2
title: 样式
type: 开发
---

样式建议采用`less`预处理语言，因为 Ant Design Vue 也是使用`less`，可以方便得使用其中的变量或者方法。
项目中共有的样式最好建立`src/assets/style`文件夹下，并通过`index.less`导入。vue 加载全局的 less 文件方法如下：

1. 安装相关库

```bash
yarn add style-resources-loader --dev
yarn add vue-cli-plugin-style-resources-loader --dev
```

2. 在根目录的`vue.config.js`文件下添加

```Javascript
module.exports = {
  css: {
      loaderOptions: {
        less: {
          modifyVars: {
            // 可在这里改变全局变量
          },
          javascriptEnabled: true,
        },
      },
    },

    pluginOptions: {
      "style-resources-loader": {
        preProcessor: "less",
        patterns: [resolve("src/assets/style/index.less")], // 存放全局的less变量
      },
    },
  }
```

其中 modifyVars 可以改变第三方库的变量名，比如修改 Ant Design Vue 的主题色。

除此之外，如果使用@blazes/theme 类库得样式，因为它也依赖了 Ant Design Vue 的变量和方法，所以加载的时候需要在声明 Ant Design Vue 样式后面。

在编写我们的业务组件时候，样式的声明需要声明 scope 属性，vue 会为组件以下的样式添加唯一标识，防止与其他组件同名冲突而被覆盖。
如果修改第三方组件样式未生效时候，可以考虑加上:deep(xxx)。

在使用弹出层组件时候，如 Modal、Tooltip 时候，组件往往会暴露一个属性 overlayClassName。
这是因为弹出层的 z-index 需要很大，但是会被父级 DOM 限制最大值，所以往往会在 body 标签下新建一个 div 去挂载弹出层，这时候样式声明不能再添加 scope 属性，不再拥有唯一标识，所以可能会和其他弹窗层冲突，考虑的方法是 class 名称有自己的一套规则：业务名+组件名+弹出层性质。
