---
order: 13
title: 表头分组
subtitle: header-grouping
---

表头分组

```html
<template>
  <st :data="url" :columns="columns" rowKey="id"></st>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { ISTColumn } from "@blazes/abc/lib/st/src/type";
  import { message } from "ant-design-vue";

  export default defineComponent({
    name: "header-grouping",
    setup() {
      return {
        url: [
          {
            id: 1,
            date: 1,
            give: 12,
            buy: 13,
            total: 14,
            dragon_jade_stock: 15,
          },
        ],
        columns: [
          { title: "日期", index: "date", type: "link" },
          {
            title: "勾玉存量",
            index: "stock",
            children: [
              { title: "赠送", index: "give" },
              { title: "购买", index: "buy" },
              { title: "合计", index: "total" },
            ],
          },
          {
            title: "龙玉存量",
            index: "dragon_jade_stock",
          },
        ] as ISTColumn[],
      };
    },
  });
</script>
```
