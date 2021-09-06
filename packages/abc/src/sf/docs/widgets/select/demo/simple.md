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
  import { defineComponent } from "vue";
  import SfSelect from "@blazes/abc/lib/sf/src/widgets/sf-select.vue";

  export default defineComponent({
    name: "basic",
    setup() {
      return {
        schema: {
          properties: {
            status: {
              type: "string",
              title: "状态",
              enums: [
                { label: "待支付", value: "WAIT_BUYER_PAY", otherData: 1 },
                { label: "已支付", value: "TRADE_SUCCESS" },
                { label: "交易完成", value: "TRADE_FINISHED" },
              ],
              default: "WAIT_BUYER_PAY",
              ui: {
                widget: SfSelect,
                change: (value: string) => console.log(value),
              },
            },
            // 标签
            tags: {
              type: "string",
              title: "标签",
              default: [],
              enums: [
                { label: "待支付", value: "WAIT_BUYER_PAY" },
                { label: "已支付", value: "TRADE_SUCCESS" },
                { label: "交易完成", value: "TRADE_FINISHED" },
              ],
              ui: {
                widget: SfSelect,
                mode: "tags",
              },
            },
            // 异步数据
            async: {
              type: "string",
              title: "Async",
              default: "WAIT_BUYER_PAY",
              ui: {
                widget: SfSelect,
                asyncData: () =>
                  Promise.resolve([
                    {
                      label: "订单状态",
                      group: true,
                      children: [
                        { label: "待支付", value: "WAIT_BUYER_PAY" },
                        { label: "已支付", value: "TRADE_SUCCESS" },
                        { label: "交易完成", value: "TRADE_FINISHED" },
                      ],
                    },
                  ]),
              },
            },
          },
        },
      };
    },
  });
</script>
```
