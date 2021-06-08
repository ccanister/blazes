---
order: 4
title: 插件
type: 开发
---

插件的作用是拓展vue框架功能，可以添加全局方法、指令或者第三方组件等，以便直接在模板中使用，不用在组件中重复声明。

脚手架创建了plugins文件夹，没有直接在`main.ts`中调用`use`方法，这是为了按需加载组件，手动声明需要用到的组件，减少打包后的文件体积。

其中Ant Design Vue需要用到babel-plugin-import插件，配合webpack打包使用。同时在项目根目录下创建.babelrc文件：

```
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "ant-design-vue",
        "libraryDirectory": "es",
        "style": true	 // 会加载less文件，也可以直接写css，那么需要在文件中加载css入口文件
      }
    ]
  ]
}
```