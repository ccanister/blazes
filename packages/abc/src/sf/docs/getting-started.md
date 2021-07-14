---
type: 文档
title: 开始使用
order: 1
---

`sf`是一个基于[JSON Schema](http://json-schema.org/)标准的动态构建表单。

## 特性

- 符合 JSON Schema 标准
- 基于 antdv 基础组件库
- 可自定义小部件满足业务需求

## 如何阅读

在开始之前需要知道文档的一些简单编写规则：

- 代码以 schema. 开头的表示 JSON Schema 对象属性
- 代码以 ui. 开头的表示 UI 对象属性
- 分小部件数据源分为 静态 和 实时 两类
    - 静态 理解为 schema.enum 值，是符合 JSON Schema 标准，且限数组格式 { label：string, value: any}[]
    - 实时 理解为 ui.asyncData 值，非 JSON Schema 标准，格式 (input?: any) => Promise<ISFSchemaEnumType[]>