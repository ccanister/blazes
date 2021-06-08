---
order: 1
title: label标签插槽
subtitle: label-slot
---

表单项指定条件后才会显示

```html
<template>
  <sf :schema="schema" ref="sfRef">
    <template #name="{ schema }">
        这是自定义的{{schema.title}}
    </template>
  </sf>
</template>
<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "label-slot",
    setup() {
      return {
        schema: {
          properties: {
            name: {
              title: "名称",
              type: "string",
            },
          },
        },
      };
    },
  });
</script>
```
