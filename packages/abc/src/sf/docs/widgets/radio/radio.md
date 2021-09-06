---
type: 小部件
title: radio 单选框
order: 6
---

单选框。

## API

### schema 属性

| 参数         | 说明     | 类型                  | 默认值 |
| ------------ | -------- | --------------------- | ------ |
| `[enums]`    | 数据源   | `ISFSchemaEnumType[]` | -      |
| `[readOnly]` | 禁用状态 | `boolean`             | -      |

### ui 属性

| 参数            | 说明                                             | 类型                                    | 默认值      |
| --------------- | ------------------------------------------------ | --------------------------------------- | ----------- |
| `[asyncData]`   | 异步数据源                                       | `() => Observable<ISFSchemaEnumType[]>` | -           |
| `[styleType]`   | radio 的样式                                     | `default, button`                       | `default`   |
| `[change]`      | 值变更事件                                       | `(res: SFValue) => void`                | -           |
| `[buttonStyle]` | RadioButton 的风格样式，目前有描边和填色两种风格 | `'outline'｜'solid'`                    | `'outline'` |
