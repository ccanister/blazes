<template>
  <a-input-number
    v-model:value="value"
    :min="schema.minimum"
    :max="schema.maximum"
    :step="schema.multipleOf"
    :precision="ui.precision"
    :parser="ui.parser"
    :formatter="ui.formatter"
    :disabled="schema.readOnly"
  />
</template>

<script lang="ts">
import { defineComponent, toRaw } from "vue";
import { useModel } from "@blazes/utils";
import InputNumber from "ant-design-vue/lib/input-number";

export default defineComponent({
  name: "sf-input",
  props: {
    modelValue: [String, Number, Boolean],
    ui: Object,
    schema: Object,
  },
  components: {
    [InputNumber.name]: InputNumber,
  },
  setup(props, context) {
    const model$ = useModel<any>(props, context);
    const ui = toRaw(props.ui)!;
    if (ui.prefix != null) {
      ui.formatter = (value: number | string) =>
        value == null ? "" : `${ui.prefix} ${value}`;
      ui.parser = (value: string) => value.replace(`${ui.prefix} `, "");
    }
    if (ui.unit != null) {
      ui.formatter = (value: number | string) =>
        value == null ? "" : `${value} ${ui.unit}`;
      ui.parser = (value: string) => value.replace(` ${ui.unit}`, "");
    }

    return { model$ };
  },
});
</script>
