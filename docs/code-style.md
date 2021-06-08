---
order: 3
title: 代码风格
type: 入门
---

如果涉及到多人开发，代码风格的统一是很有必要的。脚手架接入了 eslint 代码检测和 preitter 代码格式化。

当开发人员提交 git 代码时候会触发自动对所有文件格式化和代码检测。
如果代码检测未通过，又觉得它的要求比较无理，有两种方法：

1. 可以在.eslintrc.js 文件中关闭该项检测，推荐。
2. 在 package.json 文件中去除 git hooks 字段，将关闭所有检测，不推荐。

VSCode 编辑器推荐安装一些插件，提高工作效率：

- Vetur：语法高亮、lint 检测等。
- Vue3 Snippets：代码片段
- Ant Design Vue helper：辅助 Ant Design Vue 组件编码，比如快速记忆属性。
- Preitter：代码格式化工具。
- JSON to TS：将 JSON 转化成 ts 类型。

UI 风格设计按照[ant design 设计原则](https://ant.design/docs/spec/research-form-cn)和[ant design pro](https://preview.pro.antdv.com/dashboard/workplace)。
