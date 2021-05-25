---
order: 1
title: 基本
---

快速生成表格；利用 `res` 可以适配后端数据格式。

:::demo
```html
    <template>
        <st #st [data]="url" [req]="{ params: params }" [columns]="columns"></st>
    </template>
    <script>
        export default {
            data() {
                return {
                    url: "",
                    params: {},
                    columns: []
                }
            }
        }
    </script>
```

