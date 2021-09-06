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
import SfTextArea from "@blazes/abc/lib/sf/src/widgets/sf-textarea.vue";

export default defineComponent({
  name: "simple",
  setup() {
    return {
      schema: {
        properties: {
          remark: {
            type: "string",
            title: "描述",
            ui: {
              widget: SfTextArea,
              autosize: { minRows: 2, maxRows: 6 },
              change: (val: string) => console.log("change", val),
            },
          },
        },
      },
    };
  },
});
</script>
```
