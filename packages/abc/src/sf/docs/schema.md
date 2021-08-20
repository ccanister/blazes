---
type: 文档
title: Schema
order: 2
---

## 写在前面

[JSON Schema](http://json-schema.org/) 是一种标准的定义 JSON 数据结构的规范，并不包含对这些规范转换成表单具体说明，`@blazes/form` 也是根据自己的理解并结合 `antdv` 现有数据录入组件库产生的动态构建表单类库。

JSON Schema **始终**都必须有一个类型为 `type="object"` 作为**根节点**，因此一个最简单的 Schema 结构至少是：

```ts
schema = {
  type: "object", // 可有可无，默认会强制为 `object`
  properties: {},
};
```

在描述 Schema 说明之前，有必要对表单元素与 Schema 之前的联系做一个系统性说明。

我们知道，表单是由一组 HTML 元素组件，每一个元素对应一个 Schema 属性，属性有自己的数据类型、格式信息、视觉信息等，但这些信息不足以表述 `antdv` 所提供的丰富 API 接口。为了更好利用这些 API 接口，`@balzes/form` 除了实现绝大部分 JSON Schema 标准以外，额外唯一增加了一个 `ui` 属性用于表述属性如何渲染的问题。

ui 本身也是一个 JSON 结构，为了区分 JSON Schema 属性名的对应关系，**必须**统一对属性名加上 `$` 前缀；对于数组的元素对象必须使用 `$items` 替代。

### 表单元素与数据结构的对应关系

一个完整的表单元素我们认为应该包含以下若干元素：

![](/resource/images/screenshot/form-input.png =700x300)

从左至向各元素描述：

| 结构源 | 参数             | 说明                 | 类型       | 默认值 |
| ------ | ---------------- | -------------------- | ---------- | ------ |
| Schema | `[required]`     | 是否必填项           | `boolean]` | -      |
| Schema | `[title]`        | 属性描述             | `string`   | -      |
| ui     | `[optional]`     | 标签可选信息         | `string`   | -      |
| ui     | `[optionalHelp]` | 标签可选帮助         | `string`   | -      |
| ui     | `[placeholder]`  | 文字框中显示提示信息 | `string`   | -      |
| Schema | `[description]`  | 属性目的性解释       | `string`   | -      |
| -      | `[error]`        | 错误信息             | `string`   | -      |

## JSON Schema（SFSchema）

JSON Schema 有完整的对每个属性的规范描述，当前是基于 [draft-07](http://json-schema.org/) 规范实现了部分，下列是规范具体说明：

### 常规类

| 参数     | 说明                                                         | 类型                                 | 默认值   |
| -------- | ------------------------------------------------------------ | ------------------------------------ | -------- |
| `[type]` | 数据类型，支持 JavaScript 基础类型，基础类型会转成对应的类型 | `number,string,boolean,object,array` | `object` |
| `[enum]` | 枚举，静态数据源                                             | `ISFSchemaEnumType[]`                | -        |

### 数值类型

| 参数           | 说明   | 类型     | 默认值 |
| -------------- | ------ | -------- | ------ |
| `[minimum]`    | 最小值 | `number` | -      |
| `[maximum]`    | 最大值 | `number` | -      |
| `[multipleOf]` | 倍数   | `number` | -      |

### 字符串类型

| 参数          | 说明                 | 类型     | 默认值 |
| ------------- | -------------------- | -------- | ------ |
| `[maxLength]` | 定义字符串的最大长度 | `number` | -      |
| `[minLength]` | 定义字符串的最小长度 | `number` | -      |

### 格式与视觉类

| 参数            | 说明                            | 类型      | 默认值 |
| --------------- | ------------------------------- | --------- | ------ |
| `[title]`       | 属性描述                        | `string`  | -      |
| `[description]` | 属性目的性解释                  | `string`  | -      |
| `[default]`     | 默认值                          | `any`     | -      |
| `[readOnly]`    | 是否只读状态，等同 `[disabled]` | `boolean` | -      |

### 非标准

| 参数   | 说明                                               | 类型             | 默认值 |
| ------ | -------------------------------------------------- | ---------------- | ------ |
| `[ui]` | 指定 UI 配置信息，优先级高于 `sf` 组件 `ui` 属性值 | `SFUISchemaItem` | -      |

## UI（ISFUISchemaItem）

UI Schema 结构由通用性和小部件 API 两部分组成，以下是通用性部分进行接口说明，小部件部分自行参数小部件 API。

> 为了小部件的 API 完整性，小部件 Schema 说明可能也会包含下列通用性部分。

### SFUISchema

### 基础类

| 参数           | 说明             | 类型                                              | 默认值                       |
| -------------- | ---------------- | ------------------------------------------------- | ---------------------------- | ------------ |
| `[asyncData]`  | 异步静态数据源   | `(input?: any) => Observable<SFSchemaEnumType[]>` | -                            |
| `[hidden]`     | 是否隐藏渲染     | `boolean`                                         | `false`                      |
| `[visibleIf]`  | 指定条件时才显示 | `{ [key: string]: any[]                           | ((value: any) => boolean) }` | -            |
| `[layout]`     | 表单布局         | `horizontal                                       | vertical`                    | `horizontal` |
| `[noColon]`    | 不显示冒号       | `boolean`                                         | `false`                      |
| `[labelAlign]` | 文本对齐方式     | `left                                             | right`                       | `right`      |

**visibleIf**

指定条件时才显示，例如：

- `visibleIf: { shown: [ true ] }`：当 `shown: true` 时才显示当前属性
- `visibleIf: { shown: (value: any) => value > 0 }`：复杂表达式

### 校验类

| 参数         | 说明                                     | 类型                      | 默认值  |
| ------------ | ---------------------------------------- | ------------------------- | ------- | --- |
| `[rules]`    | 表单验证规则，详情查看 `async-validator` | `object                   | array ` | -   |
| `[validate]` | 自定义校验规则                           | `ISFUISchemaItemValidate` | `false` |

#### ISFUISchemaItemValidate

| 参数          | 说明                                                                             | 类型                                                                 | 默认值   |
| ------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------- | ---------- | --- |
| `[trigger]`   | 触发规则                                                                         | `"blur"                                                              | "change" | "custom" ` | -   |
| `[validator]` | 用闭包传入了表单值，需要返回 `(rule: RuleObject, value: string) => Promise` 函数 | `(form: Ref<any>) => ((rule: RuleObject, value: string) => Promise)` | -        |

### 数组类

| 参数      | 说明            | 类型         | 默认值 |
| --------- | --------------- | ------------ | ------ |
| `[items]` | 指定子元素的 UI | `SFUISchema` | -      |

### 表单元素类

| 参数            | 说明                      | 类型     | 默认值 |
| --------------- | ------------------------- | -------- | ------ |
| `[type]`        | 指定 `input` 的 `type` 值 | `string` | `text` |
| `[placeholder]` | 文字框中显示提示信息      | `string` | -      |

### 渲染类

| 参数             | 说明                   | 类型                     | 默认值 |
| ---------------- | ---------------------- | ------------------------ | ------ |
| `[widget]`       | 指定采用什么小部件渲染 | `DefineComponent`        | -      |
| `[class]`        | 自定义类               | `string`                 | -      |
| `[grid]`         | 栅格                   | `ISFUISchemaItemGutter`  | -      |
| `[optional]`     | 标签可选信息           | `string`                 | -      |
| `[optionalHelp]` | 标签可选帮助           | `string, SFOptionalHelp` | -      |

#### 栅格 ISFUISchemaItemGutter

> **务必**二者总和为 `24`

| 参数              | 说明                                             | 类型     | 默认值 |
| ----------------- | ------------------------------------------------ | -------- | ------ |
| `[spanLabel]`     | `label` 所占栅格数                               | `number` | 5      |
| `[spanControl]`   | 表单控件所占栅格数                               | `number` | 19     |
| `[span]`          | 表单所占栅格数                                   | `number` | 24     |
| `[spanOffset]`    | `label` 栅格左侧的间隔格数，间隔内不可以有栅格   | `number` | -      |
| `[controlOffset]` | `control` 栅格左侧的间隔格数，间隔内不可以有栅格 | `number` | -      |
| `[controlWidth]`  | `control` 固定宽度                               | `number` | -      |
| `[arraySpan]`     | 数组每项所占栅格数                               | `number` | -      |
