---
order: 6
title: 可展开
subtitle: expand
---

使用 `#expand` 模板实现可展开，允许接收 `item`、`index`、`column` 三个值。附加可实现：嵌套子表格。

```ts
<template>
    <st :data="url" :columns="columns" rowKey="id">
        <template #expandedRowRender="{ record }">
            My Name is {{record.user.name}}
        </template>
    </st>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "expand",
    setup() {
    return {
        url: [
        {
            id: 1,
            user: { name: "mick" },
            email: "aaa6@qq.com",
            phone: "phone-29586",
            registered: "2021-05-26 20:27",
        },
        {
            id: 2,
            user: { name: "bob" },
            email: "bbb7@qq.com",
            phone: "phone-37835",
            registered: "2021-05-26 20:27",
        },
        ],
        columns: [
        { title: "编号", index: "id", width: 80 },
        { title: "姓名", index: "user.name", width: 120 },
        { title: "邮箱", index: "email", width: 120 },
        { title: "电话", index: "phone" },
        { title: "注册时间", type: "date", index: "registered" },
        ],
    };
    },
});
</script>
```
