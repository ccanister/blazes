---
type: 小部件
title: number 数字
order: 5
---

通过鼠标或键盘，输入范围内的数值

## API

### schema 属性

| 成员           | 说明   | 类型     | 默认值 |
| -------------- | ------ | -------- | ------ |
| `[minimum]`    | 最小值 | `number` | -      |
| `[maximum]`    | 最大值 | `number` | -      |
| `[multipleOf]` | 倍数   | `number` | `1`    |

### ui 属性

| 成员          | 说明                                        | 类型                      | 默认值 |
| ------------- | ------------------------------------------- | ------------------------- | ------ |
| `[prefix]`    | 前缀，简化 `formatter`、`parser` 的使用 | -                         | -      |
| `[unit]`      | 单位，简化 `formatter`、`parser` 的使用 | -                         | -      |
| `[formatter]` | 等同 `formatter`                          | -                         | -      |
| `[parser]`    | 等同 `parser`                             | -                         | -      |
| `[precision]` | 等同 `precision`                          | -                         | -      |
| `[change]`    | 数值发生变化的回调                          | `(value: number) => void` | -      |
