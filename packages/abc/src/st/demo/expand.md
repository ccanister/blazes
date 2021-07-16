---
order: 9
title: 可展开
subtitle: expand
---

当表格内容较多不能一次性完全展示时，允许接收 `record`、`column` 三个值。

```html
<template>
  <st :data="url" :columns="columns" rowKey="id">
    <template #expandedRowRender="{ record }">
      My Name is {{record.user.name}}
    </template>
  </st>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "expand",
    setup() {
      return {
        url: [
          {
            id: 1,
            user: { name: "mick" },
            email: "aaa6@qq.com",
            phone: "phone-29586",
            registered: "2021-05-26 20:27",
          },
          {
            id: 2,
            user: { name: "bob" },
            email: "bbb7@qq.com",
            phone: "phone-37835",
            registered: "2021-05-26 20:27",
          },
        ],
        columns: [
          { title: "编号", index: "id" },
          { title: "姓名", index: "user.name" },
          { title: "邮箱", index: "email" },
          { title: "电话", index: "phone" },
          { title: "注册时间", type: "date", index: "registered" },
        ],
      };
    },
  });
</script>
```
