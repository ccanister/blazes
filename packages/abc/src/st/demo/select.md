---
order: 13
title: 选择和操作
subtitle: select-filter
---

选择后进行操作，完成后清空选择，通过 rowSelection.selectedRowKeys 来控制选中项。

```html
<template>
  <div style="margin-bottom: 16px">
    <a-button
      type="primary"
      :disabled="!hasSelected"
      style="margin-bottom: 8px"
      @click="reload"
    >
      重新加载
    </a-button>
    <span style="margin-left: 8px">
      <template v-if="hasSelected">
        {{ `已选择 ${selectedRowKeys.length} 项` }}
      </template>
    </span>
  </div>

  <st
    :data="url"
    :columns="columns"
    rowKey="key"
    :row-selection="{
      selectedRowKeys: selectedRowKeys,
      onChange: onSelectChange,
    }"
  ></st>
</template>
<script lang="ts">
  import { defineComponent, ref, Ref, computed } from "vue";

  export default defineComponent({
    name: "select-filter",
    setup() {
      const selectedRowKeys: Ref<any[]> = ref([]);
      const hasSelected = computed(() => selectedRowKeys.value.length > 0);

      const onSelectChange = (items: any[]) => {
        selectedRowKeys.value = items;
      };
      const reload = () => {
        selectedRowKeys.value = [];
      };

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
        onSelectChange,
        selectedRowKeys,
        hasSelected,
        reload
      };
    },
  });
</script>
```
