---
order: 1
title: 表单联动
subtitle: visibleif
---

表单项指定条件后才会显示

```html
<template>
  <sf :schema="schema" ref="sfRef" :formData="formData"></sf>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import SfRadio from "@blazes/abc/dist/src/sf/src/widgets/sf-radio.vue";

  export default defineComponent({
    name: "visibleif",
    setup() {
      return {
        schema: {
          properties: {
            login_type: {
              type: "string",
              title: "登录方式",
              enum: [
                { label: "手机", value: "mobile" },
                { label: "账密", value: "account" },
              ],
              ui: {
                widget: SfRadio,
              },
            },
            mobile: {
              type: "string",
              ui: {
                visibleIf: {
                  login_type: ["mobile"],
                },
              },
            },
            name: {
              type: "string",
              ui: {
                visibleIf: {
                  login_type: ["account"],
                },
              },
            },
          },
        },
        formData: {
          login_type: "mobile",
        },
      };
    },
  });
</script>
```
