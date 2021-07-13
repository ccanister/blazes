---
order: 1
title: 基本
subtitle: basic
---

基本用法。

```html
<template>
  <verification-failed @back="back" btnText="返回" />
</template>
<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { message } from "ant-design-vue";

  export default defineComponent({
    name: "basic",
    setup() {
      const back = () => {
        message.success("back");
      };
      return {
        back,
      };
    },
  });
</script>
```
