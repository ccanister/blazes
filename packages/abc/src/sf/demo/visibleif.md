---
order: 5
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
  import SfRadio from "@blazes/abc/lib/sf/src/widgets/sf-radio.vue";

  export default defineComponent({
    name: "visibleif",
    setup() {
      return {
        schema: {
          properties: {
            login_type: {
              type: "string",
              title: "登录方式",
              enums: [
                { label: "手机", value: "mobile" },
                { label: "账密", value: "account" },
              ],
              ui: {
                widget: SfRadio,
              },
            },
            mobile: {
              title: "手机",
              type: "string",
              ui: {
                visibleIf: {
                  login_type: ["mobile"],
                },
              },
            },
            name: {
              title: "账密",
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
