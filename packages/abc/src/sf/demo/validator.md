---
order: 6
title: 表单校验
subtitle: validator
---

表单校验底层使用的是 `async-validator` ，所以需要遵守其语法。可以通过 `validate` 字段拿到表单值。

```html
<template>
  <sf :schema="schema"></sf>
</template>
<script lang="ts">
import { defineComponent, Ref } from "vue";
import { CUSTOM_TRIGGER } from "@blazes/theme/dist";
import { Rule } from "ant-design-vue/lib/form/interface";

export default defineComponent({
  name: "validator",
  setup() {
    return {
      schema: {
        properties: {
          account: {
            type: "string",
            title: "姓名",
            minLength: 5,
            required: true,
          },
          password: {
            type: "string",
            title: "密码",
            required: true,
            ui: {
              rules: {
                pattern: /^[\w]{9,11}$/,
                message: "不允许输入特殊字符，9~11位",
              },
              showPassword: true,
            },
          },
          confirmPass: {
            type: "string",
            title: "确认密码",
            required: true,
            ui: {
              showPassword: true,
              validate: {
                trigger: CUSTOM_TRIGGER,
                validator: (form: Ref<any>) => (rule: Rule, value: string) => {
                  if (form.value.password === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("两次密码输入不一致");
                  }
                },
              },
            },
          },
        },
      },
    };
  },
});
</script>

```
