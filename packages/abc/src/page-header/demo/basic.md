---
order: 1
title: 基本
subtitle: basic
---

标准页头。

```ts
<template>
  <page-header title="单号：234231029431">
    <template #logo>
      <img src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
    </template>
    <template #tab>
      <a-tabs>
        <a-tab-pane key="1" tab="详情"></a-tab-pane>
        <a-tab-pane key="2" tab="规则"></a-tab-pane>
      </a-tabs>
    </template>
    <template #breadcrumb>
      <a-breadcrumb>
        <a-breadcrumb-item>
          <a href="">一级菜单</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <a href="">二级菜单</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item>三级菜单</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <template #action>
      <a-dropdown>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">选项一</a-menu-item>
            <a-menu-item key="2">选项二</a-menu-item>
            <a-menu-item key="3">选项三</a-menu-item>
          </a-menu>
        </template>
        <a-button>操作</a-button>
      </a-dropdown>
    </template>
    <sv :data="data" :isv="isv">
    </sv>
  </page-header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "basic",
    setup() {
        return {
            isv: {
                options: [
                    { label: "编号", value: "id" },
                    { label: "名称", value: "user.name" },
                    { label: "邮箱", value: "email" },
                    {
                        label: "描述",
                        value: "desc",
                        col: 1,
                    }
                ],
                col: 2
            },
            data: {
                id: 1,
                user: {
                    name: "mike"
                },
                emial: "12345@qq.com",
                desc: "这是很长很长很长的描述"
            }
        };
    },
});
</script>
```
