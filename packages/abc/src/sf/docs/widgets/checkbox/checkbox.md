---
type: 小部件
title: checkbox 多选框
order: 3
---

一组可选项中进行多项选择时

## API

### schema 属性

| 成员         | 说明                                 | 类型                 | 默认值 |
| ------------ | ------------------------------------ | -------------------- | ------ |
| `[enum]`     | 数据源，当数据源存在于表示一组多选框 | `SFSchemaEnumType[]` | -      |
| `[readOnly]` | 禁用状态                             | `boolean`            | -      |

### ui 属性

| 成员             | 说明                                                                                                             | 类型                                        | 默认值 |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------ |
| `[asyncData]`    | 异步数据源                                                                                                       | `() => Observable<SFSchemaEnumType[]>`      | -      |
| `[label]`        | 无 `enum` 时表示多选框文本内容                                                                                   | `string`                                    | -      |
| `[span]`         | 指定每个选框单元格数量，参考[布局](https://ng.ant.design/components/checkbox/zh#components-checkbox-demo-layout) | `number`                                    | -      |
| `[checkAll]`     | 是否需要全选                                                                                                     | `boolean`                                   | -      |
| `[checkAllText]` | 全选按钮文本                                                                                                     | `string`                                    | `全选` |
| `[change]`       | 值变更事件，参数：单个多选框为 `boolean`，否则为 `ISFSchemaEnum[]`                                               | `(res: boolean \| ISFSchemaEnum[]) => void` | -      |
