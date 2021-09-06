---
type: 小部件
title: select 选择器
order: 7
---

下拉选择器。

## API

### schema 属性

| 成员         | 说明     | 类型                 | 默认值 |
| ------------ | -------- | -------------------- | ------ |
| `[enums]`    | 数据源   | `SFSchemaEnumType[]` | -      |
| `[readOnly]` | 禁用状态 | `boolean`            | -      |

### ui 属性

| 成员                  | 说明                                                                                         | 类型                                                                  | 默认值                        |
| --------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------- |
| `[asyncData]`         | 异步数据源                                                                                   | `() => Observable<SFSchemaEnumType[]>`                                | -                             |
| `[placeholder]`       | 在文字框中显示提示讯息                                                                       | `string`                                                              | -                             |
| `[allowClear]`        | 支持清除                                                                                     | `boolean`                                                             | `false`                       |
| `[bordered]`          | 是否无边框                                                                                   | `boolean`                                                             | `false`                       |
| `[dropdownClassName]` | 下拉菜单的 className 属性                                                                    | `string`                                                              | -                             |
| `[dropdownStyle]`     | 下拉菜单的 style 属性                                                                        | `object`                                                              | -                             |
| `[mode]`              | 设置 nz-select 的模式，`tags` 建议增加 `default: null`，否则可能会遇到初始化有一个空的标签。 | `multiple,tags,default`                                               | `default`                     |
| `[notFoundContent]`   | 当下拉列表为空时显示的内容                                                                   | `string`                                                              | -                             |
| `[showSearch]`        | 使单选模式可搜索                                                                             | `boolean`                                                             | `false`                       |
| `[showArrow]`         | 是否显示下拉小箭头                                                                           | `boolean`                                                             | 单选为 `true`，多选为 `false` |
| `[maxTagCount]`       | 最多显示多少个 tag                                                                           | `number`                                                              | -                             |
| `[change]`            | 选中的 nz-option 发生变化时，调用此函数                                                      | `(ngModel:any丨any[], orgData: ISFSchemaEnum丨ISFSchemaEnum[])=>void` | -                             |
