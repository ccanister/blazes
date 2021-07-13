---
order: 1
title: url加载
subtitle: url
---

通过 url 加载数据；利用 `res` 可以适配后端数据格式。

```html
<template>
  <st :data="url" :columns="columns" rowKey="id"></st>
</template>
<script lang="ts">
  import { message } from "ant-design-vue";
  import { defineComponent } from "vue";
  import { RequestService } from "@blazes/theme";

  export default defineComponent({
    name: "url",
    setup() {
      const instance = new RequestService({}).instance;
      instance.interceptors.response.use((response) => Promise.resolve(response.data));
      return {
        url: "/simple-table",
        columns: [
          { title: "姓名", index: "name" },
          { title: "年龄", index: "age" },
          { title: "tag", index: "tag" },
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
