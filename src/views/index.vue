
<template>
    <doc :item="item">
        <basic />
    </doc>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import basic from "./basic.vue";

export default defineComponent({
    name: "st",
    components: {
        basic
    },
    setup() {
        return {
            item: {"type":"CURD","title":"st","subtitle":"表格","order":1,"demo":true,"content":"<p><code>st</code> 并不是在创造另一个表格组件，而是在 <code>a-table</code> 基础上以<strong>可配置</strong>形式渲染表格，在中后台里这种方式可以满足绝大多数场景，但又可以更易地管理表格渲染动作。</p>\n","api":"<h2>API</h2>\n<h3>属性</h3>\n<table>\n<thead>\n<tr>\n<th>属性</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>[columns]</code></td>\n<td>列描述</td>\n<td><code>ISTColumn[]</code></td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n"}
        }
    }
});
</script>
