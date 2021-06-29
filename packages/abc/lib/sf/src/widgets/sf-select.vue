<template>
  <a-select
    v-model:value="model$"
    :placeholder="ui.placeholder"
    :mode="mode"
    :disabled="schema.readOnly"
  >
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
import { getData } from "@blazes/abc/lib/sf";
import Select from "ant-design-vue/lib/select";

export default defineComponent({
  name: "sf-select",
  props: {
    modelValue: [String, Boolean, Number, Array],
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
    const mode = props.ui?.mode || null;
    getData(
      props.schema as ISFSchema,
      props.ui as ISFUISchemaItem,
      model$.value
    ).then((result) => {
      list.value = result;
    });
    const setValue = (value: string) => {
      model$.value = value;
    };
    // todo 需要重写
    const resetList = (result: any) => {
      list.value = result;
    };

    return { model$, list, mode, setValue, resetList };
  },
});
</script>
