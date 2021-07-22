<template>
  <a-input-number
    v-model:value="model$"
    :min="schema.minimum"
    :max="schema.maximum"
    :step="schema.multipleOf"
    :precision="transUI.precision"
    :parser="transUI.parser"
    :formatter="transUI.formatter"
    :disabled="schema.readOnly"
  />
</template>

<script lang="ts">
import { defineComponent, Ref, toRefs, ref, watch } from "vue";
import { useModel } from "@blazes/utils";
import InputNumber from "ant-design-vue/lib/input-number";
import { object } from "vue-types";
import { ISFUISchemaItem } from "@blazes/abc/lib/sf/src/type";

export default defineComponent({
  name: "sf-input",
  props: {
    modelValue: [String, Number, Boolean],
    ui: object<ISFUISchemaItem>().isRequired,
    schema: Object,
  },
  components: {
    [InputNumber.name]: InputNumber,
  },
  setup(props, context) {
    const model$ = useModel<any>(props, context);
    const transUI = ref(props.ui) as Ref<ISFUISchemaItem>;

    watch(
      () => props.ui as ISFUISchemaItem,
      (ui) => {
        if (ui.prefix != null) {
          transUI.value = {
            ...ui,
            formatter: (value: number | string) =>
              value == null ? "" : `${ui.prefix} ${value}`,
            parser: (value: string) => value.replace(`${ui.prefix} `, ""),
          };
        }
        if (ui.unit != null) {
          transUI.value = {
            ...ui,
            formatter: (value: number | string) =>
              value == null ? "" : `${value} ${ui.unit}`,
            parser: (value: string) => value.replace(` ${ui.unit}`, ""),
          };
        }
      },
      { immediate: true }
    );

    return { model$, transUI };
  },
});
</script>
