<template>
  <div>
    <a-input-number
      v-model:value="model"
      :min="schema.minimum"
      :max="schema.maximum"
      :step="schema.multipleOf"
      :precision="transUI.precision"
      :parser="transUI.parser"
      :formatter="transUI.formatter"
      :disabled="schema.readOnly"
      @change="changeValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch, toRaw } from "vue";
import InputNumber from "ant-design-vue/lib/input-number";
import { object } from "vue-types";
import {
  ISFSchema,
  ISFUISchemaItem,
  SFValue,
} from "@blazes/abc/lib/sf/src/type";
import { NumberProperty } from "@blazes/abc/lib/sf";

export default defineComponent({
  name: "sf-input-number",
  props: {
    property: object<NumberProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFSchema>().isRequired,
  },
  components: {
    [InputNumber.name]: InputNumber,
  },
  setup(props) {
    const property = toRaw(props.property);
    const model = ref(property.value);
    const transUI = ref(props.ui) as Ref<ISFUISchemaItem>;

    const changeValue = () => {
      property.setValue(model.value);
    };

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

    const reset = (value: SFValue) => {
      model.value = value;
      property.setValue(value);
    };

    return { model, transUI, changeValue, reset };
  },
});
</script>
