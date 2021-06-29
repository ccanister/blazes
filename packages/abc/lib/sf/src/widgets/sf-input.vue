<template>
  <a-input-password
    v-if="ui.showPassword"
    v-model:value="model$"
    :placeholder="ui.placeholder"
    :disabled="schema.readOnly"
  />
  <a-input
    v-else
    :placeholder="ui.placeholder"
    v-model:value="model$"
    :disabled="schema.readOnly"
  ></a-input>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useModel } from "@blazes/utils";
import Input from "ant-design-vue/lib/input";

export default defineComponent({
  name: "sf-input",
  props: {
    modelValue: [String, Number, Boolean],
    ui: Object,
    schema: Object
  },
  components: {
    [Input.name]: Input,
    [Input.Password.name]: Input.Password
  },
  setup(props, context) {
    const model$ = useModel<any>(props, context);

    return { model$ };
  }
});
</script>
