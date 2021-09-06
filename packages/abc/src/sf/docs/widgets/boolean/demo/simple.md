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
import SfSwitch from "@blazes/abc/lib/sf/src/widgets/sf-switch.vue";

export default defineComponent({
  name: "array",
  setup() {
    return {
      schema: {
        properties: {
          status: {
            type: "boolean",
            title: "是否启用",
            ui: {
              widget: SfSwitch,
            },
          },
          // 指定内容文本
          enabled: {
            type: "boolean",
            title: "是否启用",
            ui: {
              checkedChildren: "开",
              unCheckedChildren: "关",
              widget: SfSwitch,
            },
          },
        },
      },
    };
  },
});
</script>
```
