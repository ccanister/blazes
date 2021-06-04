---
type: CURD
title: sv
subtitle: 查看
order: 2
---

查看栅格系统是在原 [Grid 栅格](https://2x.antdv.com/components/grid-cn) 基础上构建更高阶的组件，用于简化查看页布局。

## API

### sv

| 参数 | 说明 | 类型 | 默认值 |
|----|----|----|-----|
| `[isv]` | 文本配置 | `ISvOption` | - |
| `[data]` | 数据源 | `object` | - |

### ISv

| 参数 | 说明 | 类型 | 默认值 |
|----|----|----|-----|
| `[defaultVal]` | `value`不存在时默认值 | `string` | - |
| `[options]` | `value`不存在时默认值 | `ISvOption` | - |
| `[labelWidth]` | 标签文本宽度 | `number` | - |
| `[gutter]` | 栅格间隔 | `number` | - |
| `[col]` | 指定信息最多分几列展示，最终一行几列由 col 配置结合响应式规则决定 | `'1','2','3','4','5','6'` | `3` |

### ISvOption

| 参数 | 说明 | 类型 | 默认值 |
|----|----|----|-----|
| `[label]` | 标签文本宽度 | `string | ((data: T) => any)` | - |
| `[value]` | 文本值，可通过"xx.xx"获取 | `string | ((data: T) => any)` | - |
| `[col]` | 指定信息最多分几列展示，最终一行几列由 col 配置结合响应式规则决定 | `'1','2','3','4','5','6'` | `3` |
| `[renderValue]` | 自定义渲染插槽名 | `string` | - |
