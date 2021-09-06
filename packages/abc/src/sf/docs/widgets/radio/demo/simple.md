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
  import SfRadio from "@blazes/abc/lib/sf/src/widgets/sf-radio.vue";

  export default defineComponent({
    name: "array",
    setup() {
      return {
        schema: {
          properties: {
            btn: {
              type: "string",
              title: "Button",
              enums: ["A", "B", "C"],
              default: "A",
              ui: {
                widget: SfRadio,
                styleType: "button",
                buttonStyle: "solid",
              },
            },
            // 异步数据
            async: {
              type: "string",
              title: "Async",
              default: "N",
              ui: {
                widget: SfRadio,
                asyncData: () =>
                  Promise.resolve([
                    { label: "男", value: "M" },
                    { label: "女", value: "F" },
                    { label: "未知", value: "N" },
                  ]),
                change: console.log,
              },
            },
          },
        },
      };
    },
  });
</script>
```
