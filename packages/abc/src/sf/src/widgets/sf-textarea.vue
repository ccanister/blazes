<template>
  <div>
    <a-textarea
      :placeholder="ui.placeholder"
      v-model:value="model"
      :rows="ui.rows"
      :auto-size="ui.autosize"
      :disabled="schema.readOnly"
      @change="changeValue"
    ></a-textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from "vue";
import Input from "ant-design-vue/es/input";
import { StringProperty } from "@blazes/abc/lib/sf";
import type {
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
    const { ui } = toRaw(props);

    const changeValue = () => {
      if (ui.change) {
        ui.change(model.value);
      }
      property.setValue(model.value);
    };

    const reset = (value: SFValue) => {
      model.value = value;
      property.setValue(value);
    };

    return { changeValue, reset, model };
  },
});
</script>
