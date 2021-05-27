    <template>
<code-box :item="item">
        <st :data="url" :columns="columns" rowKey="id"></st>
    </code-box>
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
    
data(){
return {item: {"title":"基本","content":"<p>快速生成表格；利用 <code>res</code> 可以适配后端数据格式。</p>\n","code":"    &lt;template&gt;\n        &lt;st :data=&quot;url&quot; :columns=&quot;columns&quot; rowKey=&quot;id&quot;&gt;&lt;/st&gt;\n    &lt;/template&gt;\n    &lt;script lang=&quot;ts&quot;&gt;\n    import { defineComponent } from &quot;vue&quot;;\n    export default defineComponent({\n        name: &quot;basic&quot;,\n        setup() {\n        return {\n            url: [\n            {\n                id: 1,\n                user: { name: &quot;mick&quot; },\n                email: &quot;aaa6@qq.com&quot;,\n                phone: &quot;phone-29586&quot;,\n                registered: &quot;2021-05-26 20:27&quot;,\n            },\n            {\n                id: 2,\n                user: { name: &quot;bob&quot; },\n                email: &quot;bbb7@qq.com&quot;,\n                phone: &quot;phone-37835&quot;,\n                registered: &quot;2021-05-26 20:27&quot;,\n            },\n            ],\n            columns: [\n            { title: &quot;编号&quot;, index: &quot;id&quot;, width: 80 },\n            { title: &quot;姓名&quot;, index: &quot;user.name&quot;, width: 60 },\n            { title: &quot;邮箱&quot;, index: &quot;email&quot;, width: 80 },\n            { title: &quot;电话&quot;, index: &quot;phone&quot; },\n            { title: &quot;注册时间&quot;, type: &quot;date&quot;, index: &quot;registered&quot; },\n            ],\n        };\n        },\n    });\n    &lt;/script&gt;\n","showCode":"<pre><code class=\"hljs language-html\">    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">template</span>&gt;</span>\n        <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">st</span> <span class=\"hljs-attr\">:data</span>=<span class=\"hljs-string\">&quot;url&quot;</span> <span class=\"hljs-attr\">:columns</span>=<span class=\"hljs-string\">&quot;columns&quot;</span> <span class=\"hljs-attr\">rowKey</span>=<span class=\"hljs-string\">&quot;id&quot;</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">st</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">template</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span> <span class=\"hljs-attr\">lang</span>=<span class=\"hljs-string\">&quot;ts&quot;</span>&gt;</span><span class=\"javascript\">\n    <span class=\"hljs-keyword\">import</span> { defineComponent } <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&quot;vue&quot;</span>;\n    <span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> defineComponent({\n        <span class=\"hljs-attr\">name</span>: <span class=\"hljs-string\">&quot;basic&quot;</span>,\n        <span class=\"hljs-function\"><span class=\"hljs-title\">setup</span>(<span class=\"hljs-params\"></span>)</span> {\n        <span class=\"hljs-keyword\">return</span> {\n            <span class=\"hljs-attr\">url</span>: [\n            {\n                <span class=\"hljs-attr\">id</span>: <span class=\"hljs-number\">1</span>,\n                <span class=\"hljs-attr\">user</span>: { <span class=\"hljs-attr\">name</span>: <span class=\"hljs-string\">&quot;mick&quot;</span> },\n                <span class=\"hljs-attr\">email</span>: <span class=\"hljs-string\">&quot;aaa6@qq.com&quot;</span>,\n                <span class=\"hljs-attr\">phone</span>: <span class=\"hljs-string\">&quot;phone-29586&quot;</span>,\n                <span class=\"hljs-attr\">registered</span>: <span class=\"hljs-string\">&quot;2021-05-26 20:27&quot;</span>,\n            },\n            {\n                <span class=\"hljs-attr\">id</span>: <span class=\"hljs-number\">2</span>,\n                <span class=\"hljs-attr\">user</span>: { <span class=\"hljs-attr\">name</span>: <span class=\"hljs-string\">&quot;bob&quot;</span> },\n                <span class=\"hljs-attr\">email</span>: <span class=\"hljs-string\">&quot;bbb7@qq.com&quot;</span>,\n                <span class=\"hljs-attr\">phone</span>: <span class=\"hljs-string\">&quot;phone-37835&quot;</span>,\n                <span class=\"hljs-attr\">registered</span>: <span class=\"hljs-string\">&quot;2021-05-26 20:27&quot;</span>,\n            },\n            ],\n            <span class=\"hljs-attr\">columns</span>: [\n            { <span class=\"hljs-attr\">title</span>: <span class=\"hljs-string\">&quot;编号&quot;</span>, <span class=\"hljs-attr\">index</span>: <span class=\"hljs-string\">&quot;id&quot;</span>, <span class=\"hljs-attr\">width</span>: <span class=\"hljs-number\">80</span> },\n            { <span class=\"hljs-attr\">title</span>: <span class=\"hljs-string\">&quot;姓名&quot;</span>, <span class=\"hljs-attr\">index</span>: <span class=\"hljs-string\">&quot;user.name&quot;</span>, <span class=\"hljs-attr\">width</span>: <span class=\"hljs-number\">60</span> },\n            { <span class=\"hljs-attr\">title</span>: <span class=\"hljs-string\">&quot;邮箱&quot;</span>, <span class=\"hljs-attr\">index</span>: <span class=\"hljs-string\">&quot;email&quot;</span>, <span class=\"hljs-attr\">width</span>: <span class=\"hljs-number\">80</span> },\n            { <span class=\"hljs-attr\">title</span>: <span class=\"hljs-string\">&quot;电话&quot;</span>, <span class=\"hljs-attr\">index</span>: <span class=\"hljs-string\">&quot;phone&quot;</span> },\n            { <span class=\"hljs-attr\">title</span>: <span class=\"hljs-string\">&quot;注册时间&quot;</span>, <span class=\"hljs-attr\">type</span>: <span class=\"hljs-string\">&quot;date&quot;</span>, <span class=\"hljs-attr\">index</span>: <span class=\"hljs-string\">&quot;registered&quot;</span> },\n            ],\n        };\n        },\n    });\n    </span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n</code></pre>\n"}}
}
});
    </script>
