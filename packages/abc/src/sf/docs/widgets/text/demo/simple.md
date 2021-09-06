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
  import SfText from "@blazes/abc/lib/sf/src/widgets/sf-text.vue";

  export default defineComponent({
    name: "simple",
    setup() {
      return {
        schema: {
          properties: {
            id1: {
              type: "number",
              title: "id1",
              ui: { widget: SfText },
            },
            id2: {
              type: "number",
              title: "id2",
              ui: {
                widget: SfText,
                defaultText: "default text",
              },
            },
          },
        },
      };
    },
  });
</script>
```
