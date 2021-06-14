---
order: 1
title: 基本
subtitle: basic
---

基本查看页。

```ts
<template>
    <sv :data="data" :isv="isv">
        <template #status="{ value }">
            我觉得{{value}}的状态不错
        </template>
    </sv>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "basic",
    setup() {
        return {
            isv: {
                options: [
                    { label: "编号", value: "id" },
                    { label: "名称", value: "user.name" },
                    { label: "邮箱", value: "email" },
                    { label: "状态", value: "status", renderValue: "status" },
                    {
                        label: "描述",
                        value: "desc",
                        col: 1,
                    }
                ],
                col: 2
            },
            data: {
                id: 1,
                user: {
                    name: "mike"
                },
                emial: "12345@qq.com",
                status: "good",
                desc: "这是很长很长很长的描述"
            }
        };
    },
});
</script>
```
