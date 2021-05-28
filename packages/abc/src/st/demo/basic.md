---
order: 1
title: 基本
subtitle: basic
---

快速生成表格；利用 `res` 可以适配后端数据格式。

```html
    <template>
        <st :data="url" :columns="columns" rowKey="id"></st>
    </template>
    <script lang="ts">
    import { defineComponent } from "vue";
    export default defineComponent({
        name: "basic",
        setup() {
        return {
            url: [
            {
                id: 1,
                user: { name: "mick" },
                email: "aaa6@qq.com",
                phone: "phone-29586",
                registered: "2021-05-26 20:27",
            },
            {
                id: 2,
                user: { name: "bob" },
                email: "bbb7@qq.com",
                phone: "phone-37835",
                registered: "2021-05-26 20:27",
            },
            ],
            columns: [
            { title: "编号", index: "id", width: 80 },
            { title: "姓名", index: "user.name", width: 60 },
            { title: "邮箱", index: "email", width: 80 },
            { title: "电话", index: "phone" },
            { title: "注册时间", type: "date", index: "registered" },
            ],
        };
        },
    });
    </script>
```
