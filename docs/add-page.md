---
order: 5
title: 添加页面
type: 开发
---

## vscode 代码片段

vscode 支持通过快捷键快速创建代码片段。

![](/resource/images/screenshot/snippet.gif =700x300)

推荐使用并配置以下

```Typescript
<template>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "index",
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less">

</style>
```

## 路由注册

新建的页面如果需要通过菜单栏中有入口的话，记得在`app-data.json`中注册。

如果需要通过 url 能够展示页面，需要在`src/router/index.ts`中注册。

注意：`name`是路由的唯一标识，如果 name 相同，会导致后一个路由无法匹配。

## 状态管理

之前写过 vue2 的同学可能会习惯使用 vuex 来做状态管理。
如果我们不去对数据做溯源的话，其实没有必要使用，它的写法是比较累赘的。
我们可以直接使用全局的单例对象去替代，当然前提是这个对象里存放的是全部组件都会用到的东西。
最好把作用域隔离到组件中，方便管理和防止冲突，可以理解为一个组件拥有自己的服务单例对象。
如果需要跨组件使用，可以通过参数或者 vue 的[提供/注入](https://vue3js.cn/docs/zh/guide/composition-api-provide-inject.html)传递实例对象。
因为 vue 没有提供依赖注入，所以对象的实例化得自己维护。

再拓宽来看，组件的开发可以隔层开发，分别是 DAO 层 -> Service 层 -> 视图层。
DAO 层对应`src/utils/api.service`，里面可以存放所有和服务端操作的方法。
如果文件太大，可以考虑根据业务拆分，通常会把 Service 层和视图层混合开发。
视图层也就是组件的 defineComponent，混合后会导致这部分代码很长。
当代码过长的时候，可以考虑拆分逻辑，理想结果是在该部分获取到 Service 层对象后，所有的方法和属性都从该对象中获取并返回。

## setup

vue3 推荐属性和方法都在 setup 方法中声明并返回，包括生命周期函数、data 和 computed 等。有几点原因：

1. 逻辑迁移到 setup 方法中后，比较清晰，而且相似逻辑容易提取复用。
2. 之前 data 对象中属性都是响应式的，这是不合乎逻辑的，也会造成性能影响。在 setup 中声明的属性需要手动设置响应式，否则模板不会更新。

## 示例：表格开发

假设我们现在开发的页面是以表格为主，并且已经注册完路由。一般会由以下几部分组成：

![](/resource/images/screenshot/simple-table.png =700x300)

一般分成四部分，我们只讨论三部分。

1. 页面信息：用户可以快速理解当前页面是什么以及它的功能。我们也可以放置按钮操作、描述信息和标签栏等。

```html
<page-header></page-header>
```

2. 添加操作：这里的布局往往是一致的，所以会有表格布局组件进行强绑定。

```html
<table-wrapper>
  <template #left>
    <a-button type="primary" @click="add"> <PlusOutlined />添加 </a-button>
  </template>
  <!-- 表格内容 -->
</table-wrapper>
```

3. 表格：@blazes/abc 的 st 组件支持配置项表格，只需要传入 url 和列信息即可生成表格。

```Typescript
 <st :data="url" :columns="columns" rowKey="id"></st>
// ts
const columns: ISTColumn[] = [
      { title: "姓名", index: "name" },
      { title: "年龄", index: "age" },
      { title: "tag", index: "tag", type: "tag", tag: tagMap },
      {
        title: "操作",
        buttons: [
          {
            text: "编辑",
          },
          {
            text: "删除",
            type: "popconfirm",
            popconfirm: {
              title: "确认删除吗",
              confirm: () => {
                message.success("删除成功");
              },
            },
          },
          {
            text: "更多",
            children: [
              {
                text: "下载",
              },
            ],
          },
        ],
      },
];

const url = "/simple-table";
```

以上是对页面的布局分析，然后我们来看逻辑上的操作。
- 涉及到与服务端交互，所以需要提前在api.service中声明方法。
- 设计表单：表单也是具有大量的相似代码，`@balzes/abc`中的`sf`组件是基于JSON Schema标准动态表单，建立在 ant-form组件基础之上，验证使用了async-validator库。
错误提示消息默认是英文，所以需要修改报错信息，`@balzes/theme`已集成，脚手架在`src/main.ts调用即可。

```Typescript
import { initSchema } from "@blazes/theme";
initSchema();
```

下面是表单的构建过程：
```Typescript
<sf :schema="schema" @formSubmit="submit" @formReset="close()" :formData="formData"></sf>
const schema: ISFSchema = {
      properties: {
        name: {
          title: "名称",
          required: true,
        },
        age: {
          title: "年龄",
          required: true,
          type: "number",
        },
        tag: {
          title: "tag",
          required: true,
          enums: tagOptions,
          ui: {
            widget: SfSelect,
            gutter: {
              spanControl: 8,
            },
          },
        },
      },
};
```

假设这里的表单是弹出形式，那么最好满足以下几点：
- 每次打开新页面都是组件重新创建，而不是上一次遗留下的，比如表单验证失败后的残留。
- 支持命令式声明，方便在编辑时候配置，而不是在模板中声明`<a-modal></a-modal>`，难以复用。
- 表单组件往往是独立，所以需要支持传入组件参数，并可以在组件内关闭弹窗。

因此，`@blazes/theme`提供了`ModalHelper`类来打开弹窗，内容可以是组件或者字符串等。

```Typescript
const { dialogRef } = ModalHelper.open<boolean>({
  title: `编辑项目`,
  component: Add,
  componentParams: {
    formData: record,
  },
});
```

如果是组件，可以传递参数到组件内部，并且会动态传递dialogRef对象，以便组件在内部关闭弹窗。
- 按钮操作后：假设组件是编辑模式，在点击确认之后，需要在和服务端交互之后才能关闭弹窗，且在这段时间之内，用户无法再次点击按钮。
`@blazes/theme`通过拦截器获取点击的按钮和后端交互的方法，决定按钮是否需要loading。
```Typescript
const close = (result?: any) => {
  (props.dialogRef as any).close(result);
};
const submit = (form: any) => {
  postItem(form).then(() => {
    message.success(`操作成功：${JSON.stringify(form)}`);
    close(true);
  }).catch((error) => message.error(`操作失败:${error}`));
};
```

这里的逻辑比较简单，所以可以直接混用。

- 弹窗关闭后：当弹窗关闭后，如果是确认按钮那么就需要重新加载列表。
```Typescript
dialogRef.afterClose.then((result) => {
  if (result) {
    (stRef.value as typeof st).reloadCurrent();
  }
});
```