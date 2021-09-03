---
order: 2
title: 表达默认值
subtitle: form-data
---

可设置默认值，会监听默认值的变化重新设置表单值。

```html
<template>
  <sf :schema="schema" :formData="formData"></sf>
</template>
<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { message } from "ant-design-vue";

  export default defineComponent({
    name: "form-data",
    setup() {
      const formData = ref({
        field1: "大白",
        field2: "",
      });
      setTimeout(() => {
        message.warn("发生变化!");
        formData.value = {
          field1: "小白",
          field2: "我已变化",
        };
      }, 5000);
      return {
        schema: {
          properties: {
            field1: {
              title: "field1",
              type: "string",
              required: true,
            },
            field2: {
              title: "field2",
              type: "string",
            },
          },
        },
        formData,
      };
    },
  });
</script>
```
