---
order: 6
title: 可编辑单元格
subtitle: editable-cell
---

带单元格编辑功能的表格，通过 `render` 自定义渲染。

```html
<template>
  <a-button @click="add" style="margin-bottom: 8px">添加</a-button>
  <st :data="url" :columns="columns" rowKey="key">
    <template #name="{ row, value }">
      <div>
        <div v-if="row.edit" style="display: flex; align-items: center">
          <a-input v-model:value="row._name" @pressEnter="save(row)" />
          <check-outlined @click="save(row)" />
        </div>
        <div v-else>
          {{ value.text }}
          <edit-outlined @click="edit(row)" />
        </div>
      </div>
    </template>
  </st>
</template>
<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { ISTColumn, ISTData } from "@blazes/abc/lib/st/src/type";
  import { message } from "ant-design-vue";
  import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";

  export default defineComponent({
    name: "editable-cell",
    components: {
      CheckOutlined,
      EditOutlined,
    },
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

      const add = () => {
        const id = datas.value.length;
        const newData = {
          key: `${id}`,
          name: `Edward King ${id}`,
          age: 32,
          address: `London, Park Lane no. ${id}`,
        };
        datas.value = [...datas.value, newData];
      };

      const edit = (record: ISTData) => {
        record._name = record.name;
        record.edit = true;
      };

      const save = (record: ISTData) => {
        record.name = record._name;
        record.edit = false;
        datas.value = [...datas.value];
      };

      return {
        url: datas,
        columns: [
          { title: "姓名", index: "name", render: "name", width: "30%" },
          { title: "年龄", index: "age" },
          { title: "地址", index: "address" },
          {
            title: "操作",
            buttons: [
              {
                text: "删除",
                type: "popconfirm",
                popconfirm: {
                  title: "确定删除吗",
                  confirm: (record) => {
                    datas.value = datas.value.filter((d) => d !== record);
                  },
                },
              },
            ],
          },
        ] as ISTColumn[],
        add,
        edit,
        save,
      };
    },
  });
</script>
```
