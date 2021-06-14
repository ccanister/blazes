---
type: CURD
title: st
subtitle: 表格
order: 1
---

`st` 并不是在创造另一个表格组件，而是在 `a-table` 基础上以**可配置**形式渲染表格，在中后台里这种方式可以满足绝大多数场景，但又可以更易地管理表格渲染动作。

## 关于数据源
`data` 支持三种不同格式数据源，整体分为：URL和静态数据两类。

### URL

指的是通过一个 URL 字符串来获取数据。

- 通过 `req.params`等参数解决请求数据格式问题
- 通过 `res.reName` 重置数据 `key` 而无须担心后端数据格式是否满足 `st` 需求
- 通过 `res.process` 可以对表格渲染前对数据进一步优化

### 静态数据

指的是通过指定值为 `STData[]` 或 `Observable<STData[]>`，二者都遵循以下规则：

- `pagination` 是否显示分页器；当未指定时若 `ps>total` 情况下自动不显示
- `page.front` 前端分页，默认：`true`
  - `true` 由 `st` 根据 `data` 长度受控分页，包括：排序、过滤等
  - `false` 由用户通过 `total` 和 `data` 参数受控分页，并维护 `(change)` 当分页变更时重新加载数据

## API

### 属性

| 属性        | 说明   | 类型          | 默认值 |
| ----------- | ------ | ------------- | ------ |
| `[columns]` | 列描述 | `ISTColumn[]` | -      |
| `[data]` | 数据源 | `string, ISTData[]` | - |
| `[req]` | 请求体配置 | `ISTReq` | - |
| `[res]` | 返回体配置 | `ISTRes` | - |
| `[pi]` | 当前页码 | `number` | `1` |
| `[ps]` | 每页数量，当设置为 `0` 表示不分页，默认：`10` | `number` | `10` |
| `[total]` | 当前总数据，在服务器渲染时需要传入，默认：`0` | `number` | `0` |
| `[page]` | 分页器配置 | `ISTPage` | - |
| `[bordered]` | 是否显示边框 | `boolean` | `false` |
| `[scroll]` | 横向或纵向支持滚动，也可用于指定滚动区域的宽高度：`{ x: "300px", y: "300px" }` | `{ y?: string; x?: string }` | - |
| `[rowKey]` | 数据源主键，对应v-for唯一标识 | `string` | - |

### 组件属性与方法

名称 | 说明
--- | -----
`resetColumns(options?: ISTResetColumnsOption)` | 重置列描述
`load(pi = 1, extraParams?: any, options?: ISTLoadOptions)` | 加载指定页
`reload(extraParams?: any, options?: ISTLoadOptions)` | 重新加载第一页
`reloadCurrent()` | 重新刷新当前页

一些细节：

- `extraParams` 若不传递表示保留原始值
- `ISTLoadOptions.merge` 是否合并模式，即 `extraParams` 跟新值合并而非替代

**使用方式**

```ts
<template ref="stRef">
    <st ref="stRef" >
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { st } from "@blazes/abc";

export default defineComponent({
    setup() {
        const stRef: Ref<typeof st | null> = ref(null);

        return { stRef };
    }
})
```

### ISTReq

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`[params]` | 额外请求参数，默认自动附加 `pi`、`ps` 至URL | `any` | -
`[firstParams]` | 只在一次请求时候会传入的额外请求参数 | `any` | -
`[headers]` | 请求体 `headers` | `any` | -
`[reName]` | 重命名请求参数 `pi`、`ps` | `STReqReNameType` | `{ pi: 'pi', ps: 'ps', skip: 'skip', limit: 'limit' }`

### ISTRes

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`[reName]` | 重命名返回参数 `total`、`items`，支持 `a.b.c` 的嵌套写法 | `{total:string;list:string}` | -
`[process]` | 数据预处理 | `(data: ISTData[], rawData?: any) => ISTData[]` | -

### ISTPage

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`[front]` | 前端分页，当 `data` 为 `any[]` 或 `Observable<any[]>` 有效 | `boolean` | `true`
`[show]` | 是否显示分页器 | `boolean` | `true`
`[total]` | 是否显示总数据量，字符串表示自定义模板（支持三个变量名：`total` 表示数据总量、`range[0]` 和 `range[1]` 表示当前数据范围；**变量名**统一使用双花括号包裹） | `boolean, string` | `false`

### ISTData

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`[checked]` | 选择框或单选框状态值 | `boolean` | -
`[disabled]` | 选择框或单选框 `disabled` 值 | `boolean` | -
`[expand]` | 是否展开状态 | `boolean` | -
`[showExpand]` | 是否显示展开按钮 | `boolean` | -

### ISTColumn
参数 | 说明 | 类型 | 默认值
----|------|-----|------
`[title]` | 列名 | `string` | -
`[type]` | `link` 链接，可触发 `click`<br>`tag` [标签](https://2x.antdv.com/components/tag-cn) | `string` | -
`[index]` | 列数据在数据项中对应的 key，支持 `a.b.c` 的嵌套写法 | `string, string[]` | -
`[render]` | 自定义渲染ID | `string` | -
`[renderTitle]` | 标题自定义渲染ID | `string` | -
`[default]` | 当不存在数据（值类型为 `undefined`）时以默认值替代 | `string` | -
`[buttons]` | 按钮组 | `ISTColumnButton[]` | -
`[width]` | 列宽 | `string` | -
`[fixed]` | 固定前后列，当指定时务必指定 `width` 否则视为无效 | `left,right` | -
`[format]` | 格式化列值 | `(item: ISTData, col: ISTColumn) => string` | -
`[sorter]` | 排序配置项，类似于Array.sort的compare | `(o1: ISTData, o2: ISTData) => number` | -
`[filter]` | 过滤配置项 | `ISTColumnFilter` | -
`[click]` | 链接回调 | `(record: STData, instance?: STComponent) => void` | -
`[tag]` | 徽标配置项 | `ISTColumnTag` | -
`[iif]` | 条件表达式<br>1、仅赋值 `columns` 时执行一次<br>2、可调用 `resetColumns()` 再一次触发 | `(item: STColumn) => boolean` | -

### STColumnFilter

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`[menus]` | 表头的筛选菜单项，至少一项才会生效，支持从远程加载 | `ISTColumnFilterMenu[] | (() => Promise<ISTColumnFilterMenu[]>)` | -
`[fn]` | 本地数据的筛选函数 | `(filter: ISTColumnFilterMenu, record: ISTData) => boolean` | -
`[default]` | 标识数据是否经过过滤，筛选图标会高亮 | `boolean` | -
`[confirmText]` | filter 确认按钮文本 | `string` | `确认`
`[clearText]` | filter 清除按钮文本 | `string` | `重置`
`[key]` | 远程数据的过滤时后端相对应的KEY，默认使用 `index` 属性 | `string` | -
`[reName]` | 远程数据的过滤时后端相对应的VALUE | `(list: ISTColumnFilterMenu[], col: ISTColumn) => Object` | -

### ISTColumnFilterMenu

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`[text]` | 文本 | `string` | -
`[value]` | 值 | `any` | -
`[checked]` | 是否选中 | `boolean` | -

### ISTColumnButton

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`[text]` | 文本与图标共存 | `string | (record: ISTData, btn: ISTColumnButton) => string` | -
`[icon]` | 图标与文本共存 | `string` | -
`[type]` | 按钮类型 | `popconfirm` | -
`[click]` | 点击回调；**reload：** 重新刷新当前页 | `(record: ISTData, ) => void | reload` | -
`[children]` | 下拉子菜单` | -
`[iif]` | 自定义条件表达式 | `(item: STData, btn: STColumnButton, column: STColumn) => boolean` | `() => true`
`[popconfirm]` | 是否需要气泡确认框 | `ISTColumnPopConfirm` | -

### ISTColumnPopConfirm

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`[title]` | 标题 | `string` | -
`[confirm]` | 点击确认后回调 | `(record: ISTData) => void` | -
