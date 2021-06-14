---
order: 1
title: 基本
subtitle: basic
---

基本用法。

```html
<template>
    <table-wrapper>
        <template #left>
            <a-button type="primary">添加</a-button>
        </template>
        <template #right>
            <search-input v-model="model" />
        </template>
        <st :columns="columns" :data="data" rowKey="id" />
    </table-wrapper>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
    name: "basic",
    setup() {
    return {
        columns: [
            { title: "编号", index: "id", width: 80 },
            { title: "姓名", index: "user.name", width: 120 },
            { title: "邮箱", index: "email", width: 150 },
            { title: "电话", index: "phone" },
            { title: "注册时间", type: "date", index: "registered" },
        ],
        data: ref([]),
        model: ref("基本")
    };
    },
});
</script>
```