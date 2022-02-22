---
order: 4
title: 嵌套表单
subtitle: nest
---

对象嵌套。

```html
<template>
  <sf :schema="schema" @formSubmit="confirm"></sf>
</template>
<script lang="ts">
  import { defineComponent, ref } from "vue";
  import SfObject from "@blazes/abc/lib/sf/src/widgets/sf-object.vue";
  import { message } from "ant-design-vue";

  export default defineComponent({
    name: "nest",
    setup() {
      const confirm = (form: any) => {
        message.success(JSON.stringify(form));
      };
      return {
        schema: {
          properties: {
            name: { type: "string", title: "姓名" },
            age: { type: "number", title: "年龄" },
            address: {
              title: "地址",
              type: "object",
              properties: {
                country: { title: "国家", type: "string" },
                city: { title: "城市", type: "string" },
                zone: { title: "区域", type: "string" },
              },
              ui: {
                widget: SfObject,
              },
            },
          },
        },
        confirm,
      };
    },
  });
</script>
```
