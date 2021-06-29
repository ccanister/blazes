---
order: 3
title: 单元格自动省略
subtitle: ellipsis
---

设置 `ellipsis` 可以让单元格内容根据宽度自动省略。

```html
<template>
    <st :data="url" :columns="columns" rowKey="id"></st>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "ellipsis",
    setup() {
    return {
        url: [
        {
            id: 1,
            user: { name: "mick" },
            email: "aaa6@qq.com",
            phone: "phone-29586",
            desc: "短描述",
        },
        {
            id: 2,
            user: { name: "bob" },
            email: "bbb7@qq.com",
            phone: "phone-37835",
            type: "ellipsis"
        },
        ],
        columns: [
        { title: "编号", index: "id", width: 80 },
        { title: "姓名", index: "user.name", width: 120 },
        { title: "邮箱", index: "email", width: 150 },
        { title: "电话", index: "phone", width: 150 },
        { title: "描述", index: "desc", width: 800 },
        ],
    };
    },
});
</script>
```
