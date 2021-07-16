---
order: 12
title: 远程数据筛选和排序
subtitle: url-filter-sort
---

url 加载数据的筛选和排序。
```html
<template>
  <st :data="url" :columns="columns" rowKey="id"></st>
</template>
<script lang="ts">
  import { message } from "ant-design-vue";
  import { defineComponent } from "vue";
  import { RequestService } from "@blazes/theme";

  export default defineComponent({
    name: "url-filter-sort",
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
