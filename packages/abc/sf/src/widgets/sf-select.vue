<template>
  <a-select v-model:value="model$" :placeholder="ui.placeholder" :mode="mode">
    <a-select-option
      v-for="item in list"
      :key="item.value"
      :value="item.value"
      :disabled="list.disabled"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import { useModel } from "@blazes/utils";
import { defineComponent, Ref, ref } from "vue";
import { ISFSchema, ISFUISchemaItem } from "../type";
import { getData } from "../util";
import { Select } from "ant-design-vue";

export default defineComponent({
  name: "sf-select",
  props: {
    modelValue: [String, Boolean, Number],
    ui: Object,
    schema: Object,
  },
  components: {
    [Select.name]: Select,
    [Select.Option.displayName as string]: Select.Option,
  },
  setup(props, context) {
    const model$ = useModel<any>(props, context);
    const list: Ref<any[]> = ref([]);
    getData(
      props.schema as ISFSchema,
      props.ui as ISFUISchemaItem,
      model$.value
    ).then((result) => {
      list.value = result;
    });
    const mode = props.ui?.mode || "";

    return { model$, list, mode };
  },
});
</script>
