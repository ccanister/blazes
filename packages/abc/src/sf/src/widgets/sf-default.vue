<template>
  <div>
    <a-input-password
      v-if="ui.showPassword"
      v-model:value="model$"
      :placeholder="ui.placeholder"
      :disabled="schema.readOnly"
      :maxlength="schema.maxlength"
    />
    <a-input
      v-else
      :placeholder="ui.placeholder"
      :defaultValue="model$"
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
import { defineComponent, ref, watch } from "vue";
import Input from "ant-design-vue/lib/input";
import { typeModels } from "../model/context";

export default defineComponent({
  name: "sf-default",
  props: {
    modelValue: [String, Number, Boolean],
    ui: Object,
    schema: Object,
  },
  components: {
    [Input.name]: Input,
    [Input.Password.name]: Input.Password,
  },
  setup(props) {
    const model$ = ref(props.modelValue);
    watch(
      () => props.modelValue,
      (value) => {
        model$.value = value;
      }
    );
    const changeText = (text: string) => {
      model$.value = new typeModels[props.schema!.type as string]().getValue(
        text
      );
    };

    return { model$, changeText };
  },
});
</script>
