---
order: 1
title: 开始使用
type: 文档
---

ACL 全称叫访问控制列表（Access Control List），是一种非常简单的基于角色权限控制方式。一个完全独立 @blazes/acl 模块。

## 如何使用

安装 `@blazes/acl`依赖包：

```shell
yarn add @blazes/acl
```

## API

### ACLService

| 名称                               | 说明                                   |
| ---------------------------------- | -------------------------------------- |
| `[aclChange]`                      | 监听 ACL 变更通知                      |
| `[data]`                           | 获取所有 ACL 数据，类型为 IACLChange   |
| `setFull(val: boolean)`            | 标识当前用户为全量，即不受限           |
| `set(value: IACLType)`             | 设置当前用户角色（会先清除所有）       |
| `setRole(roles: string[])`         | 设置当前用户角色（会先清除所有）       |
| `add(value: IACLType)`             | 为当前用户增加角色                     |
| `attachRole(roles: string[])`      | 为当前用户附加角色                     |
| `removeRole(roles: string[])`      | 为当前用户移除角色                     |
| `can(roleOrAbility: IACLCanType)`  | 当前用户是否有对应角色                 |
| `resetOptions(config: IACLConfig)` | 设置配置，当前只支持未授权时跳转的路由 |

### IACLCanType

```typescript
type IACLCanType = string | string[] | IACLType;
```

### IACLType

| 参数       | 说明                                                                                                   | 类型             | 默认值  |
| ---------- | ------------------------------------------------------------------------------------------------------ | ---------------- | ------- |
| `[roles]`  | 角色                                                                                                   | `string[]`       | -       |
| `[mode]`   | `allOf` 表示必须满足所有角色或权限点数组算有效 <br> `oneOf` 表示只须满足角色或权限点数组中的一项算有效 | `allOf`, `oneOf` | `oneOf` |
| `[except]` | 是否取反，即结果为 `true` 时表示未授权                                                                 | `boolean`        | `false` |

### IACLConfig

| 参数          | 说明               | 类型     | 默认值           |
| ------------- | ------------------ | -------- | ---------------- |
| `[guard_url]` | 未授权时跳转的路由 | `string` | `/exception/403` |
