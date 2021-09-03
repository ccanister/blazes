---
order: 3
title: 表单数组
subtitle: array
---

支持了卡片型组件数组。

```html
<template>
  <sf :schema="schema" @formSubmit="confirm"></sf>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import SfArray from "@blazes/abc/lib/sf/src/widgets/sf-array.vue";
import { message } from "ant-design-vue";

export default defineComponent({
  name: "array",
  setup() {
    const confirm = (form: any) => {
      message.success(JSON.stringify(form));
    };
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
      confirm
    };
  },
});
</script>

```
