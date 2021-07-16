---
order: 3
title: 带边框
subtitle: border
---

添加表格边框线，页头和页脚。

```html
<template>
  <st :data="url" :columns="columns" rowKey="key" bordered>
    <template #title>Header</template>
    <template #footer>Footer</template>
  </st>
</template>
<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "border",
    setup() {
      return {
        url: [
          {
            key: "1",
            user: { name: "John Brown" },
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
          },
          {
            key: "2",
            user: { name: "Jim Green" },
            age: 42,
            address: "London No. 1 Lake Park",
            tags: ["loser"],
          },
          {
            key: "3",
            user: { name: "Joe Black" },
            age: 32,
            address: "Sidney No. 1 Lake Park",
            tags: ["cool", "teacher"],
          },
        ],
        columns: [
          { title: "姓名", index: "user.name" },
          { title: "年龄", index: "age" },
          { title: "地址", index: "address" },
        ],
      };
    },
  });
</script>
```
