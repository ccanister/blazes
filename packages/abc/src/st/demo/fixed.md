---
order: 10
title: 固定头和列
subtitle: fixed
---

适合同时展示有大量数据和数据列。

```html
<template>
  <st :data="url" :columns="columns" rowKey="key" :scroll="{ x: 1500, y: 300 }" />
</template>
<script lang="ts">
  import { defineComponent } from "vue";

  interface DataItem {
    key: number;
    name: string;
    age: number;
    address: string;
  }

  export default defineComponent({
    name: "fixed",
    setup() {
      const data: DataItem[] = [];
      for (let i = 0; i < 100; i++) {
        data.push({
          key: i,
          name: `Edrward ${i}`,
          age: 32,
          address: `London Park no. ${i}`,
        });
      }
      return {
        url: data,
        columns: [
          {
            title: "姓名",
            width: "100px",
            index: "name",
            fixed: "left",
          },
          {
            title: "年龄",
            width: "100px",
            index: "age",
            fixed: "left",
          },
          { title: "Column 1", index: "address", width: "150px" },
          { title: "Column 2", index: "address", width: "150px" },
          { title: "Column 3", index: "address", width: "150px" },
          { title: "Column 4", index: "address", width: "150px" },
          { title: "Column 5", index: "address", width: "150px" },
          { title: "Column 6", index: "address", width: "150px" },
          { title: "Column 7", index: "address", width: "150px" },
          { title: "Column 8", index: "address" },
        ],
      };
    },
  });
</script>
```
