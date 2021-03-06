---
order: 2
title: url加载
subtitle: url
---

通过 url 加载数据；利用 `res` 可以适配后端数据格式。

```html
<template>
  <st
    :data="url"
    :columns="columns"
    rowKey="id"
    :page="{pageSizes: ['10', '30'], showSize: true}"
  ></st>
</template>
<script lang="ts">
  import { message } from "ant-design-vue";
  import { defineComponent } from "vue";
  import { RequestService } from "@blazes/theme";

  export default defineComponent({
    name: "url",
    setup() {
      const instance = new RequestService({}).instance;
      instance.interceptors.response.use((response) =>
        Promise.resolve(response.data)
      );
      return {
        url: "/simple-table",
        columns: [
          {
            title: "姓名",
            index: "name",
            filter: {
              menus: [
                {
                  text: "John",
                  value: "John",
                },
                {
                  text: "Bob",
                  value: "Bob",
                },
              ],
            },
          },
          { title: "年龄", index: "age", sorter: { compare: true } },
          {
            title: "操作",
            buttons: [
              {
                text: "更多",
                click: () => {
                  message.success("下载成功");
                },
              },
            ],
          },
        ],
      };
    },
  });
</script>
```
