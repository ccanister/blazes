---
order: 1
title: 基本
subtitle: basic
---

基本用法。

```html
<template>
    <search-input v-model="model" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
    name: "basic",
    setup() {
    return {
        model: ref("基本")
    };
    },
});
</script>
```