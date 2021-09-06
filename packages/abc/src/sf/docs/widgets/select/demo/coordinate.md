---
order: 2
title: 联动
subtitle: coordinate
---

省市联动是典型的例子。

```ts
<template>
  <sf :schema="schema" ref="sfRef" :formData="data"></sf>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import SfSelect from "@blazes/abc/lib/sf/src/widgets/sf-select.vue";

export default defineComponent({
  name: "coordinate",
  setup() {
    const sfRef: Ref<any> = ref();
    const data = {
      province: "Zhejiang",
      city: "Ningbo",
    };
    const cityData: { [place: string]: string[] } = {
      Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
      Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"],
    };

    const updateCity = (province: string, city: string = "") => {
      const cityProperty = sfRef.value.searchProperty("/city")!;
      const items = cityData[province];
      cityProperty.widget.resetList(items.map(item => ({label: item,value: item})));
      cityProperty.widget.reset(city || items[0]);
    };
    return {
      schema: {
        properties: {
          province: {
            type: "string",
            title: "Province",
            ui: {
              widget: SfSelect,
              asyncData: () =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    updateCity(data.province, data.city);
                  }, 100);
                  resolve(["Zhejiang", "Jiangsu"]);
                }),
              change: (i: string) => updateCity(i),
            },
          },
          city: {
            type: "string",
            title: "City",
            ui: {
              widget: SfSelect,
            },
          },
        },
      },
      sfRef,
      data
    };
  },
});
</script>
```
