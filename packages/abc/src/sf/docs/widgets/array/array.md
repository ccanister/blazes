---
type: 小部件
title: array 数组
order: 1
---

创建对象数组，只对 `schema.type="array"` 时有效。

## 关于布局
数组的布局分为数组本身以及数组元素布局，`arraySpan` 决定每个数组元素占栅格数值。

Schema 内嵌 UI 风格：

```javascript
const schema = {
  list: {
    type: 'array',
    items: {
      a: { type: 'string' },
      b: { type: 'number', ui: { spanLabel: 10 } }
    },
    ui: { spanLabel: 5, grid: { arraySpan: 12 } }
  }
};
```

注意： `items` 下所有属性都继承于 `list.ui`，最终 `items.a` 为 5 个单位、`items.b` 为 10 个单位。

Schema 与 UI 分开风格，假如上述 Schema 转化成 UI 写法：

```javascript
const ui = {
  $list: {
    $items: {
      $b: { spanLabel: 10 }
    },
    spanLabel: 5,
    grid: { arraySpan: 12 }
  }
};
```

## API

### schema 属性

| 参数 | 说明 | 类型 | 默认值 |
|----|----|----|-----|
| `[items]` | 数组元素类型描述 | `SFSchema` | - |

