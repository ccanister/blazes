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
  import { defineComponent, ref } from "vue";
  import SfInputNumber from "@blazes/abc/lib/sf/src/widgets/sf-input-number.vue";

  export default defineComponent({
    name: "array",
    setup() {
      return {
        schema: {
          properties: {
            number: {
              type: "number",
              title: "number",
              minimum: 18,
              maximum: 100,
              multipleOf: 2,
              ui: { widget: SfInputNumber },
            },
            unit: {
              type: "number",
              title: "unit",
              default: 10,
              ui: { unit: "%", widget: SfInputNumber },
            },
            prefix: {
              type: "number",
              title: "prefix",
              default: 10,
              ui: { prefix: "$", widget: SfInputNumber },
            },
          },
        },
      };
    },
  });
</script>
```
