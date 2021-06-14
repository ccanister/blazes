---
order: 1
title: 基本
subtitle: basic
---

基本用法。

```html
<template>
    <tags :tagMap="map" :value="value" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
    name: "basic",
    setup() {
    return {
        map: {
            success: {
                color: "#87d068",
                text: "成功"
            },
            fail: {
                color: "#f50",
                text: "失败"
            }
        },
        value: "success"
    };
    },
});
</script>
```