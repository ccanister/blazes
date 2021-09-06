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
  import SfSlider from "@blazes/abc/lib/sf/src/widgets/sf-slider.vue";

  export default defineComponent({
    name: "simple",
    setup() {
      return {
        schema: {
          properties: {
            name: {
              type: "string",
              title: "Name",
              required: true,
              ui: {
                addonBefore: "RMB",
                placeholder: "RMB结算",
                change: (val: string) => console.log(val),
              },
            },
            mobile: {
              type: "string",
              title: "手机号",
            },
            regex: {
              type: "string",
              pattern: `^[abc]+$`,
              title: "正则表达式",
              ui: {
                placeholder: `^[abc]+$`,
              },
            },
          },
        },
      };
    },
  });
</script>
```
