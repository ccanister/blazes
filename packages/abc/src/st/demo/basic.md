---
order: 1
title: 基本
subtitle: basic
---

快速生成表格；利用 `res` 可以适配后端数据格式。

```html
<template>
  <st :data="url" :columns="columns" rowKey="id"></st>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ISTColumn } from "@blazes/abc/lib/st/src/type";

export default defineComponent({
name: "basic",
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
        {
        id: 3,
        user: { name: "bob" },
        email: "bbb7@qq.com",
        phone: "phone-37835",
        registered: "2021-05-26 20:27",
        },
        {
        id: 4,
        user: { name: "bob" },
        email: "bbb7@qq.com",
        phone: "phone-37835",
        registered: "2021-05-26 20:27",
        },
        {
        id: 5,
        user: { name: "bob" },
        email: "bbb7@qq.com",
        phone: "phone-37835",
        registered: "2021-05-26 20:27",
        },
        {
        id: 6,
        user: { name: "bob" },
        email: "bbb7@qq.com",
        phone: "phone-37835",
        registered: "2021-05-26 20:27",
        },
        {
        id: 7,
        user: { name: "bob" },
        email: "bbb7@qq.com",
        phone: "phone-37835",
        registered: "2021-05-26 20:27",
        },
        {
        id: 8,
        user: { name: "bob" },
        email: "bbb7@qq.com",
        phone: "phone-37835",
        registered: "2021-05-26 20:27",
        },
        {
        id: 9,
        user: { name: "bob" },
        email: "bbb7@qq.com",
        phone: "phone-37835",
        registered: "2021-05-26 20:27",
        },
        {
        id: 10,
        user: { name: "bob" },
        email: "bbb7@qq.com",
        phone: "phone-37835",
        registered: "2021-05-26 20:27",
        },
        {
        id: 11,
        user: { name: "bob" },
        email: "bbb7@qq.com",
        phone: "phone-37835",
        registered: "2021-05-26 20:27",
        },
        {
        id: 12,
        user: { name: "bob" },
        email: "bbb7@qq.com",
        phone: "phone-37835",
        registered: "2021-05-26 20:27",
        },
        {
        id: 13,
        user: { name: "bob" },
        email: "bbb7@qq.com",
        phone: "phone-37835",
        registered: "2021-05-26 20:27",
        },
        {
        id: 14,
        user: { name: "bob" },
        email: "bbb7@qq.com",
        phone: "phone-37835",
        registered: "2021-05-26 20:27",
        },
    ],
    columns: [
        { title: "编号", index: "id", width: 80 },
        { title: "姓名", index: "user.name", width: 120 },
        { title: "邮箱", index: "email", width: 150 },
        { title: "电话", index: "phone" },
        { title: "注册时间", type: "date", index: "registered" },
    ] as ISTColumn[],
    };
},
});
</script>
```
