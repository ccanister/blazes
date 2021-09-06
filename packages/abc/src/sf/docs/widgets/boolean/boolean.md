---
type: 小部件
title: boolean 开关
order: 2
---

开关选择器

## API

### schema 属性

| 参数         | 说明     | 类型      | 默认值 |
| ------------ | -------- | --------- | ------ |
| `[readOnly]` | 禁用状态 | `boolean` | -      |

### ui 属性

| 参数                  | 说明           | 类型                      | 默认值 |
| --------------------- | -------------- | ------------------------- | ------ |
| `[checkedChildren]`   | 选中时的内容   | `string`                  | -      |
| `[unCheckedChildren]` | 非选中时的内容 | `string`                  | -      |
| `[change]`            | 切换开关回调   | `(value: string) => void` | -      |
