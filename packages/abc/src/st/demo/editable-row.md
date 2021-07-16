---
order: 7
title: 可编辑行
subtitle: editable-row
---

带单元格编辑功能的表格，通过 `render` 自定义渲染。

```html
<template>
  <st :data="url" :columns="columns" rowKey="key">
    <template #edit="{ row, value, column }">
      <div>
        <div v-if="row.edit" style="display: flex; align-items: center">
          <a-input v-model:value="row[column.index]" @pressEnter="save(row)" />
        </div>
        <div v-else>{{ value.text }}</div>
      </div>
    </template>
  </st>
</template>
<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { ISTColumn, ISTData } from "@blazes/abc/lib/st/src/type";

  export default defineComponent({
    name: "editable-row",
    setup() {
      const datas = ref([
        {
          key: "0",
          name: "Edward King 0",
          age: 32,
          address: "London, Park Lane no. 0",
        },
        {
          key: "1",
          name: "Edward King 1",
          age: 32,
          address: "London, Park Lane no. 1",
        },
      ]);

      return {
        url: datas,
        columns: [
          { title: "姓名", index: "name", render: "edit" },
          { title: "年龄", index: "age", render: "edit" },
          { title: "地址", index: "address", render: "edit" },
          {
            title: "操作",
            buttons: [
              {
                text: "编辑",
                click: (record) => {
                  record.edit = true;
                },
              },
              {
                text: "保存",
                type: "popconfirm",
                popconfirm: {
                  title: "确定保存吗",
                  confirm: (record) => {
                    record.edit = false;
                    datas.value = [...datas.value];
                  },
                },
              },
            ],
          },
        ] as ISTColumn[],
      };
    },
  });
</script>
```
