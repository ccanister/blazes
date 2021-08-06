<template>
  <div>
    <a-input-password
      v-if="ui.showPassword"
      v-model:value="model"
      :placeholder="ui.placeholder"
      :disabled="schema.readOnly"
      :maxlength="schema.maxlength"
      @change="changeText"
    />
    <a-input
      v-else
      :placeholder="ui.placeholder"
      v-model:value="model"
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
import { defineComponent, ref, toRaw } from "vue";
import Input from "ant-design-vue/lib/input";
import { object } from "vue-types";
import {
  ISFUISchemaItem,
  SFValue,
  ISFSchema,
} from "@blazes/abc/lib/sf/src/type";
import { StringProperty } from "@blazes/abc/lib/sf";

export default defineComponent({
  name: "sf-default",
  props: {
    property: object<StringProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFSchema>().isRequired,
  },
  components: {
    [Input.name]: Input,
    [Input.Password.name]: Input.Password,
  },
  emits: {
    "update:modelValue": null,
  },
  setup(props) {
    const property = toRaw(props.property);
    const model = ref(property.value);
    const { ui } = toRaw(props);

    const changeText = () => {
      if (ui.change) {
        ui.change(model.value);
      }
      property.setValue(model.value);
    };

    const reset = (value: SFValue) => {
      model.value = value;
      property.setValue(value);
    };

    return { changeText, reset, model };
  },
});
</script>
