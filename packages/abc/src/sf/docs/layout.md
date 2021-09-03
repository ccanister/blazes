---
type: 文档
title: 如何布局
order: 5
---

表单布局依赖了 `Grid`，而 ISFSchema 的渲染类来决定布局参数。

## 类型

### 垂直

标签和表单控件上下垂直排列，可通过 `layout` 参数设置

### 水平

标签和表单控件水平排列，一般用于编辑页，可通过 `labelAlign` 参数设置。

水平类型相对于行内与垂直更复杂一点，会涉及到标签和控件的宽度，可以通过 `span` 、 `spanLabel` 和 `spanControl` 改变表单项、表单标签和表单控件的宽度。

### 不规则布局

当然，表单不可能每一行都有固定表单项数量，有可能某个表单项会占用一整行，由于栅格系统的因素，这会产生另一个问题：**标签无法对齐**，sf 提供一种方案，即固定所有标签的宽度 `spanLabelFixed` 属性，例如：

```json
{
  "properties": {
    "email": {
      "type": "string",
      "title": "邮箱"
    },
    "name": {
      "type": "string",
      "title": "姓名",
      "minLength": 5
    }
  },
  "ui": {
    "gutter": {
      "spanLabelFixed": 100,
      "span": 12
    }
  }
}
```

## 按钮

按钮布局渲染可通过 `span` 调整位置，更多设置参考 `ISFButton`。

**自定义**

当你希望自定义按钮时，务必设置 `button` 值为 `null`。往往用于模态框

```html
<sf #sf [button]="null">
  <a-button  type="button" button>重置</a-button>
</sf>
```
