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
    name: "array",
    setup() {
      return {
        schema: {
          properties: {
            count: {
              type: "number",
              title: "数量",
              default: 10,
              ui: {
                widget: SfSlider,
              },
            },
            // 双滑块模式
            range: {
              type: "number",
              title: "范围",
              default: [10, 20],
              ui: {
                widget: SfSlider,
                range: true,
              },
            },
          },
        },
      };
    },
  });
</script>
```
