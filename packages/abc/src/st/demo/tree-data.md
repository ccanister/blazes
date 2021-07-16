---
order: 8
title: 树形数据展示
subtitle: tree-data
---

表格支持树形数据的展示，当数据中有 children 字段时会自动展示为树形表格，如果不需要或配置为其他字段可以用 childrenColumnName 进行配置。 可以通过设置 indentSize 以控制每一层的缩进宽度。

```html
<template>
  <st :data="url" :columns="columns" rowKey="key"> </st>
</template>
<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { ISTColumn, ISTData } from "@blazes/abc/lib/st/src/type";

  export default defineComponent({
    name: "tree-data",
    setup() {
      const datas = ref([
        {
          key: "0",
          name: "Edward King 0",
          age: 32,
          address: "London, Park Lane no. 0",
          children: [
            {
              key: 11,
              name: "John Brown",
              age: 42,
              address: "New York No. 2 Lake Park",
            },
            {
              key: 12,
              name: "John Brown jr.",
              age: 30,
              address: "New York No. 3 Lake Park",
              children: [
                {
                  key: 121,
                  name: "Jimmy Brown",
                  age: 16,
                  address: "New York No. 3 Lake Park",
                },
              ],
            },
          ],
        },
        {
          key: "1",
          name: "Edward King 1",
          age: 32,
          address: "London, Park Lane no. 1",
          children: [
            {
              key: 131,
              name: "Jim Green",
              age: 42,
              address: "London No. 2 Lake Park",
              children: [
                {
                  key: 1311,
                  name: "Jim Green jr.",
                  age: 25,
                  address: "London No. 3 Lake Park",
                },
                {
                  key: 1312,
                  name: "Jimmy Green sr.",
                  age: 18,
                  address: "London No. 4 Lake Park",
                },
              ],
            },
          ],
        },
      ]);

      return {
        url: datas,
        columns: [
          { title: "姓名", index: "name" },
          { title: "年龄", index: "age" },
          { title: "地址", index: "address" },
        ] as ISTColumn[],
      };
    },
  });
</script>
```
