---
type: 小部件
title: string 文本框
order: 9
---

默认小部件，一般用于字符串元素。

## API

### schema 属性

| 成员          | 说明         | 类型      | 默认值 |
| ------------- | ------------ | --------- | ------ |
| `[maxLength]` | 表单最大长度 | `number`  | -      |
| `[readOnly]`  | 禁用状态     | `boolean` | -      |

### ui 属性

| 成员            | 说明                                      | 类型                    | 默认值 |
| --------------- | ----------------------------------------- | ----------------------- | ------ |
| `[type]`        | 等同 input 的 `type` 值，例如：`password` | `string`                | -      |
| `[placeholder]` | 在文字框中显示提示讯息                    | `string`                | -      |
| `[addonBefore]` | 前置标签，等同 `addonBefore`              | `string`                | -      |
| `[addonAfter]`  | 后置标签，等同 `addonAfter`               | `string`                | -      |
| `[prefix]`      | 带有前缀图标的 input，等同 `nzPrefix`     | `string`                | -      |
| `[suffix]`      | 带有后缀图标的 input，等同 `nzSuffix`     | `string`                | -      |
| `[change]`      | 内容变更事件                              | `(val: string) => void` | -      |
