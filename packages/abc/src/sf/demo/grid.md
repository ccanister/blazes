---
order: 4
title: 表单布局
subtitle: grid
---

布局底层使用了栅格，通过 `span` 、 `spanLabel` 和 `spanControl` 改变表单项、表单标签和表单控件的宽度。

```html
<template>
  <sf :schema="schema"></sf>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SfSwitch from "@blazes/abc/lib/sf/src/widgets/sf-switch.vue";
import SfSlider from "@blazes/abc/lib/sf/src/widgets/sf-slider.vue";
import SfTextarea from "@blazes/abc/lib/sf/src/widgets/sf-textarea.vue";

export default defineComponent({
  name: "grid",
  setup() {
    return {
      schema: {
        properties: {
          email: {
            type: "string",
            title: "邮箱",
            format: "email",
          },
          name: {
            type: "string",
            title: "姓名",
            minLength: 5,
          },
          age: {
            type: "number",
            title: "年龄",
            minLength: 5,
            minimum: 18,
            maximum: 50,
            default: 25,
          },
          yesOrNot: {
            type: "boolean",
            title: "允许售卖",
            default: true,
            ui: {
              widget: SfSwitch,
            },
          },
          range: {
            type: "number",
            title: "范围",
            default: 10,
            ui: {
              widget: SfSlider,
              gutter: { span: 16 },
            },
          },
          remark: {
            type: "string",
            title: "描述",
            ui: {
              widget: SfTextarea,
              autosize: { minRows: 3 },
              gutter: { span: 24 },
            },
          },
        },
        ui: {
          gutter: {
            span: 8,
          },
        },
      },
    };
  },
});
</script>
```
