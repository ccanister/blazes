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
  import SfCheckbox from "@blazes/abc/lib/sf/src/widgets/sf-checkbox.vue";

  export default defineComponent({
    name: "basic",
    setup() {
      return {
        schema: {
          properties: {
            // 单个多选框
            single: {
              type: "boolean",
              default: true,
              ui: {
                widget: SfCheckbox,
                label: "同意本协议",
                gutter: {
                  span: 0,
                },
              },
            },
            // 多选框组
            mulit: {
              type: "string",
              title: "Mulit",
              enums: ["Apple", "Pear", "Orange"],
              default: ["Apple"],
              ui: {
                widget: SfCheckbox,
                span: 8, // 指定每一项 8 个单元的布局
                checkAll: true,
              },
            },
            // 异步数据
            async: {
              type: "string",
              title: "Async",
              default: ["Apple"],
              ui: {
                widget: SfCheckbox,
                asyncData: () =>
                  Promise.resolve([
                    { label: "Apple", value: "Apple" },
                    { label: "Pear", value: "Pear" },
                    { label: "Orange", value: "Orange" },
                  ]),
              },
            },
          },
        },
      };
    },
  });
</script>
```
