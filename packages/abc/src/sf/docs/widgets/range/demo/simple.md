---
order: 1
title: 基础样例
subtitle: basic
---

最简单的用法。

```html
<template>
  <sf :schema="schema"></sf>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import SfRangePicker from "@blazes/abc/lib/sf/src/widgets/sf-range-picker.vue";

  export default defineComponent({
    name: "simple",
    setup() {
      return {
        schema: {
          properties: {
            start: {
              title: "start",
              ui: { widget: SfRangePicker },
            },
          },
        },
      };
    },
  });
</script>
```
