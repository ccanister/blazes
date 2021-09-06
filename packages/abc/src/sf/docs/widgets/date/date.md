---
type: 小部件
title: date 日期
order: 4
---

输入或选择日期的控件。

## API

### schema 属性

| 成员         | 说明     | 类型      | 默认值 |
| ------------ | -------- | --------- | ------ |
| `[readOnly]` | 禁用状态 | `boolean` | -      |

### ui 属性

| 参数             | 说明                                                                                                       | 类型                         | 默认值 |
| ---------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------- | ------ |
| `[mode]`         | 渲染模式                                                                                                   | `date,week,month`            | `date` |
| `[placeholder]`  | 在文字框中显示提示讯息                                                                                     | `string`                     | -      |
| `[disabledDate]` | 不可选择的日期                                                                                             | `(current: Date) => boolean` | -      |
| `[showTime]`     | 增加时间选择功能，`object` 类型为 [TimePickerOptions](https://2x.antdv.com/components/time-picker-cn/#API) | `object,boolean`             | `true` |
| `[change]`       | 时间发生变化的回调                                                                                         | `(data: Date ) => void`      | -      |
| `[format]`       | 数据格式类型                                                                                               | `string`                     | -      |
