<template>
  <a-textarea
    :placeholder="ui.placeholder"
    v-model:value="model"
    :rows="ui.rows"
    :autosize="ui.autosize"
    :disabled="schema.readOnly"
  ></a-textarea>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from "vue";
import Input from "ant-design-vue/lib/input";
import { StringProperty } from "@blazes/abc/lib/sf";
import {
  ISFUISchemaItem,
  ISFSchema,
  SFValue,
} from "@blazes/abc/lib/sf/src/type";
import { object } from "vue-types";

export default defineComponent({
  name: "sf-textarea",
  props: {
    property: object<StringProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFSchema>().isRequired,
  },
  components: {
    [Input.TextArea.name]: Input.TextArea,
  },
  setup(props) {
    const property = toRaw(props.property);
    const model = ref(property.value);
    const changeText = () => {
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
