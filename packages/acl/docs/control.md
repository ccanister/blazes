---
order: 2
title: 指令控制
type: 文档
---

## 写在前面

很多时候需要对某个按钮进行权限控制，@balzes/acl 提供一个 acl 指令，可以利用角色或权限点对某个按钮、表格、列表等元素进行权限控制。

需要手动注册该指令

```typescript
import { AclDirecitve } from "@blazes/acl";

app.directive("acl", new AclDirecitve());
```

## 原理

`[acl]` 默认在目标元素上利用 display: none 来隐藏未授权元素，它是一个简单、又高效的方式。

## 示例

按钮必须拥有 user 角色显示。

```html
<button v-acl="'user'"></button>
```

按钮必须拥有 user 或 manage 角色显示。

```html
<button v-acl="['user', 'manage']"></button>
```

按钮必须拥有 user 和 manage 角色显示。

```html
<button v-acl="{ role: ['user', 'manage'] , mode: 'allOf' }"></button>
```

使用 `except` 反向控制，当未拥有 user 角色时显示

```html
<button v-acl="{ role: 'user' , except: true }"></button>
```
