---
type: 文档
title: 自定义小部件
order: 4
---

`@blazes/form` 会内置 `antv` 的表单组件作为基础，可以参考 `@blazes/abc/lib/sf/src/widgets/` 路径下的组件扩展需求。

## 编写

对于每个表单项会实例化 `BaseModel`，来做数据格式的回调。 例如设置 `type: number`，那么最后得到的值肯定是数字类型。会在 `props` 中传入 以`property`键值传入。

其次组件会额外传入 `schema` 和 `ui`两个参数，会在你配置的 `JSON schema` 基础上额外拓展属性，但你不需要关心。

当组件内部改变改变值的时候，需要调用 `property.setValue` 方法，这样 `form` 库才会感知到其值得改变，并重新赋值。

当需要监听 `formData` 表单默认值改变的话，需要组件暴露 `reset(value: any)` 方法和上册通信。

以最简单的输入框为例：

```vue
<template>
  <input v-mode="model" />
</template>

<script lang="ts">
export default defineComponent({
  props: {
    property: object<AtomicProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFSchema>().isRequired,
  },
  setup(props) {
    const property = toRaw(props.property);
    const model = ref(property.value);

    const changeValue = () => {
      property.setValue(model.value);
    };

    const reset = (value: SFValue) => {
      model.value = value;
      property.setValue(value);
    };

    return {
      model,
      changeValue,
      reset,
    };
  },
});
</script>
```

**注意**

- 监听 `change` 和 `blur` 事件时候，如果节点是根节点的话，需要在外面包裹一层容器。因为 `antdv/form` 会劫持这两个事件，导致最后传入的事件是数组。
- 如果组件内部需要用到表单数据对象，可通过依赖注入获取 `const from = inject("form")`

## 使用

因为 `vue` 支持模板的动态组件写法，所以在 `JSON Schema` 中直接导入该组件即可。