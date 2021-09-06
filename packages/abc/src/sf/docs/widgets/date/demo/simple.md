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
  import SfDate from "@blazes/abc/lib/sf/src/widgets/sf-date.vue";

  export default defineComponent({
    name: "array",
    setup() {
      return {
        schema: {
          properties: {
            datetime: {
              type: "string",
              title: "datetime",
              ui: {
                widget: SfDate,
                showTime: true,
              },
            },
            date: {
              type: "string",
              title: "date",
              ui: {
                widget: SfDate,
              },
            },
            month: {
              type: "string",
              title: "month",
              ui: {
                widget: SfDate,
                mode: "month",
              },
            },
            week: {
              type: "string",
              title: "week",
              ui: {
                widget: SfDate,
                mode: "week",
              },
            },
          },
        },
      };
    },
  });
</script>
```
