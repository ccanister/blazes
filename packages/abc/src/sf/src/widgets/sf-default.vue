<template>
  <div>
    <!-- <a-input-password
      v-if="ui.showPassword"
      v-model:value="model$"
      :placeholder="ui.placeholder"
      :disabled="schema.readOnly"
      :maxlength="schema.maxlength"
    /> -->
    <a-input
      :placeholder="ui.placeholder"
      :defaultValue="property.value"
      :disabled="schema.readOnly"
      :maxlength="schema.maxlength"
      :type="ui.type"
      :addonAfter="ui.addonAfter"
      :addonBefore="ui.addonBefore"
      :prefix="ui.prefix"
      :suffix="ui.suffix"
      @change="changeText"
    ></a-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw, watch } from "vue";
import Input from "ant-design-vue/lib/input";
import { typeModels } from "../model/context";
import { FormProperty } from "../model/form.property";
import { object } from "vue-types";
import { ISFUISchemaItem } from "../type";
import StringProperty from "../model/string";

export default defineComponent({
  name: "sf-default",
  props: {
    property: object<StringProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFUISchemaItem>().isRequired,
  },
  components: {
    [Input.name]: Input,
    [Input.Password.name]: Input.Password,
  },
  emits: {
    "update:modelValue": null,
  },
  setup(props, { emit }) {
    const property = toRaw(props.property);
    const changeText = (event: InputEvent) => {
      // const value = new typeModels[props.schema!.type as string]().getValue(
      //   model$.value
      // );
      // emit("update:modelValue", value);
      const value = (event.target as HTMLInputElement).value;
      property.setValue(value);
    };

    return { changeText };
  },
});
</script>
