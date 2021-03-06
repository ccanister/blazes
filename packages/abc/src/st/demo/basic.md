---
order: 1
title: 基本
subtitle: basic
---

简单的表格，`index` 支持 `a.b` 嵌套语法。最后一列是按钮操作。

```html
<template>
  <st :data="url" :columns="columns" rowKey="key"></st>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { ISTColumn } from "@blazes/abc/lib/st/src/type";
  import { message } from "ant-design-vue";

  export default defineComponent({
    name: "basic",
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
          {
            title: "操作",
            buttons: [
              {
                text: "邀请",
                click: (record) => {
                  message.success(`邀请${record.user.name}成功`);
                },
              },
              {
                text: "删除",
              },
              {
                text: "更多",
                children: [
                  {
                    text: "复制",
                  },
                ],
              },
            ],
          },
        ] as ISTColumn[],
      };
    },
  });
</script>
```
