<template>
  <div>
    <a-input-number
      v-model:value="model"
      :min="schema.minimum"
      :max="schema.maximum"
      :step="schema.multipleOf"
      :precision="ui.precision"
      :parser="ui.parser"
      :formatter="ui.formatter"
      :disabled="schema.readOnly"
      :placeholder="ui.placeholder"
      @change="changeValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from "vue";
import InputNumber from "ant-design-vue/es/input-number";
import { object } from "vue-types";
import type {
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
    const { ui } = toRaw(props);

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

    const changeValue = () => {
      property.setValue(model.value);
    };
    const reset = (value: SFValue) => {
      model.value = value;
      property.setValue(value);
    };

    return { model, changeValue, reset };
  },
});
</script>
