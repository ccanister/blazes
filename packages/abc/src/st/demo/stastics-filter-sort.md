---
order: 11
title: 本地筛选和排序
subtitle: statics-filter-sort
---

静态数据的筛选和排序。

```html
<template>
  <st :data="url" :columns="columns" rowKey="key" />
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { ISTData, ISTColumnFilterMenu } from "@blazes/abc/lib/st/src/type";

  interface DataItem {
    key: number;
    name: string;
    age: number;
    address: string;
  }

  export default defineComponent({
    name: "statics-filter-sort",
    setup() {
      const data: DataItem[] = [];
      for (let i = 0; i < 100; i++) {
        data.push({
          key: i,
          name: ["Edrward", "Bob", "John"][i % 3],
          age: Math.floor(Math.random() * 100),
          address: `London Park no. ${i}`,
        });
      }
      return {
        url: data,
        columns: [
          {
            title: "姓名",
            index: "name",
            filter: {
              menus: [
                {
                  text: "Edrward",
                  value: "Edrward",
                },
                {
                  text: "Bob",
                  value: "Bob",
                },
                {
                  text: "John",
                  value: "John",
                },
              ],
              fn: (menu: ISTColumnFilterMenu, data: ISTData) => {
                return data.name === menu.value;
              },
            },
          },
          {
            title: "年龄",
            index: "age",
            filter: {
              menus: [
                {
                  text: 20,
                  value: 20,
                },
                {
                  text: 30,
                  value: 30,
                },
                {
                  text: 40,
                  value: 40,
                },
              ],
              fn: (menu: ISTColumnFilterMenu, data: ISTData) => {
                return data.age === menu.value;
              },
            },
            sorter: {
              compare: (o1: ISTData, o2: ISTData) => o1.age - o2.age,
            },
          },
          {
            title: "地址",
            index: "address",
          },
        ],
      };
    },
  });
</script>
```
