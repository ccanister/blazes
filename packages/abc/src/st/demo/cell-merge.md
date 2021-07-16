---
order: 5
title: 表格行/列合并
subtitle: cell-merge
---

表头只支持列合并，使用 column 里的 colSpan 进行设置。 表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。

```html
<template>
  <st :data="url" :columns="columns" rowKey="key"></st>
</template>
<script lang="ts">
  import { defineComponent, h } from "vue";
  import { ISTColumn } from "@blazes/abc/lib/st/src/type";

  export default defineComponent({
    name: "cell-merge",
    setup() {
      const renderContent = (key: string) => ({ record, index }: any) => {
        const obj = {
          children: record[key],
          props: {} as any,
        };
        if (index === 4) {
          obj.props.colSpan = 0;
        }
        return obj;
      };
      return {
        url: [
          {
            key: "1",
            name: "John Brown",
            age: 32,
            tel: "0571-22098909",
            phone: 18889898989,
            address: "New York No. 1 Lake Park",
          },
          {
            key: "2",
            name: "Jim Green",
            tel: "0571-22098333",
            phone: 18889898888,
            age: 42,
            address: "London No. 1 Lake Park",
          },
          {
            key: "3",
            name: "Joe Black",
            age: 32,
            tel: "0575-22098909",
            phone: 18900010002,
            address: "Sidney No. 1 Lake Park",
          },
          {
            key: "4",
            name: "Jim Red",
            age: 18,
            tel: "0575-22098909",
            phone: 18900010002,
            address: "London No. 2 Lake Park",
          },
          {
            key: "5",
            name: "Jake White",
            age: 18,
            tel: "0575-22098909",
            phone: 18900010002,
            address: "Dublin No. 2 Lake Park",
          },
        ],
        columns: [
          {
            title: "姓名",
            index: "name",
            customRender: ({ record, index }) => {
              if (index < 4) {
                return h("a", { href: "javascript:;" }, record.name);
              }
              return {
                children: h("a", { href: "javascript:;" }, record.name),
                props: {
                  colSpan: 5,
                },
              };
            },
          },
          {
            title: "年龄",
            index: "age",
            customRender: renderContent("age"),
          },
          {
            title: "电话",
            index: "tel",
            colSpan: 2,
            customRender: ({ record, index }) => {
              const obj = {
                children: record.tel,
                props: {} as any,
              };
              if (index === 2) {
                obj.props.rowSpan = 2;
              }
              if (index === 3) {
                obj.props.rowSpan = 0;
              }
              if (index === 4) {
                obj.props.colSpan = 0;
              }
              return obj;
            },
          },
          {
            title: "手机",
            index: "phone",
            colSpan: 0,
            customRender: renderContent("phone"),
          },
          {
            title: "住址",
            index: "address",
            customRender: renderContent("address"),
          },
        ] as ISTColumn[],
      };
    },
  });
</script>
```
