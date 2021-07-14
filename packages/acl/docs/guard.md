---
order: 3
title: 路由守卫
type: 文档
---

## 写在前面

路由守卫可以防止未授权用户访问页面。

路由守卫需要单独对每一个路由进行设置，很多时候这看起来很繁琐，@balzes/acl 实现了通用守卫类 aclGuard。

默认未授权用户访问的页面会跳转到 `/exception/403`，可通过 `aclService.resetOptions(config: IACLConfig)` 覆盖默认配置。

## 示例

```typescript
import { aclGuard } from "@blazes/acl";
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: ...,
        beforeEnter: aclGuard,
        meta: { guard: { roles: ["user"] } }, // guard可传入IACLCanType类型
    }
]
```
