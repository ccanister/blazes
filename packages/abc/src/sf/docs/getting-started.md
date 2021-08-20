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

## 如何使用

目前已集成在`@blazes/abc`库中，不需要额外安装其他库。
底层使用的是 [antd form](https://2x.antdv.com/components/form-cn)，所以校验也是 [async-validator](https://github.com/yiminghe/async-validator)。

## API

### sf

| 参数         | 说明                   | 类型              | 默认值 |
| ------------ | ---------------------- | ----------------- | ------ |
| `[schema]`   | **必填项** JSON Schema | `ISFSchema`       | -      |
| `[ui]`       | UI Schema              | `ISFUISchemaItem` | -      |
| `[formData]` | 表单默认值             | `any`             | -      |
| `[button]`   | 按钮                   | `ISFSchemaButton` | `{}`   |

### 事件

| 事件名称       | 说明           | 回调参数         |
| -------------- | -------------- | ---------------- |
| `(formChange)` | 数据变更时回调 | `ISFValueChange` |
| `(formSubmit)` | 提交表单时回调 | `any`            |
| `(formReset)`  | 点击取消后回调 | -                |

### ISFValueChange

| 参数          | 说明               | 类型     | 默认值 |
| ------------- | ------------------ | -------- | ------ |
| `[value]`     | 当前表单值         | `any`    | -      |
| `[path]`      | 当前触发路径       | `string` | -      |
| `[pathValue]` | 当前触发路径对应值 | `any`    | -      |

### ISFSchemaButton

| 参数           | 说明                 | 类型      | 默认值  |
| -------------- | -------------------- | --------- | ------- |
| `[submitText]` | 提交按钮文本         | `string`  | `提交`  |
| `[hideSubmit]` | 是否隐藏提交按钮     | `boolean` | `false` |
| `[resetText]`  | 取消按钮文本         | `string`  | `重置`  |
| `[hideReset]`  | 是否隐藏取消按钮     | `boolean` | `false` |
| `[span]`       | 按钮栅格，默认靠最右 | `number`  | -       |

#### 自定义

当你希望自定义按钮时，务必设置 `button` 值为 `null` 。

```html
<sf [button]="null">
  <a-button type="primary">保存</a-button>
</sf>
```

### 组件方法

| 参数             | 说明                     | 返回值         |
| ---------------- | ------------------------ | -------------- |
| `submit`         | 提交表单                 | `void`         |
| `reset`          | 点击取消按钮             | `void`         |
| `searchProperty` | 根据路径获取表单元素属性 | `FormProperty` |

> **注：** 所有 path 采用 `/` 来分隔，例如：`/user/name`、`/arr/0/name`。
