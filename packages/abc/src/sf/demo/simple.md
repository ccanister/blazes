---
order: 1
title: 简单场景
subtitle: simple
---

最简单的表单使用场景。

```html
<template>
  <sf :schema="schema" @formSubmit="confirm" @formRest="cancel"></sf>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SfRadio from "@blazes/abc/lib/sf/src/widgets/sf-radio.vue";
import SfSelect from "@blazes/abc/lib/sf/src/widgets/sf-select.vue";
import SfTextarea from "@blazes/abc/lib/sf/src/widgets/sf-textarea.vue";
import { message } from "ant-design-vue";

export default defineComponent({
  name: "simple",
  setup() {
    const confirm = (form: any) => {
      message.success(JSON.stringify(form));
    };
    const cancel = () => {
      message.warn("取消");
    };
    return {
      schema: {
        properties: {
          name: {
            title: "名称",
            type: "string",
            required: true,
          },
          sex: {
            title: "性别",
            type: "number",
            enums: [
              { label: "男", value: 0 },
              { label: "女", value: 1 },
            ],
            ui: {
              widget: SfRadio,
            },
          },
          hobby: {
            title: "爱好",
            type: "string",
            enums: [
              { label: "读书", value: "read" },
              { label: "打球", value: "ball" },
              { label: "睡觉", value: "sleep" },
            ],
            ui: {
              widget: SfSelect,
            },
          },
          desc: {
            title: "描述",
            type: "string",
            ui: {
              widget: SfTextarea,
              autosize: { minRows: 2, maxRows: 6 },
            },
          },
        },
      },
      confirm,
      cancel,
    };
  },
});
</script>
```
