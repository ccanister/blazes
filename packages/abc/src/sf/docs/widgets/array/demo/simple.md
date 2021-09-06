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
import SfArray from "@blazes/abc/lib/sf/src/widgets/sf-array.vue";

export default defineComponent({
  name: "basic",
  setup() {
    return {
      schema: {
        properties: {
          products: {
            title: "产品清单",
            type: "array",
            items: {
              properties: {
                name: {
                  title: "名称",
                },
                price: {
                  title: "单价",
                },
              },
            },
            ui: {
              widget: SfArray,
            },
          },
        },
      },
    };
  },
});
</script>
```
