<template>
  <a-input-password
    v-if="ui.showPassword"
    v-model:value="model$"
    :placeholder="ui.placeholder"
  />
  <a-input
    v-else
    :placeholder="ui.placeholder"
    v-model:value="model$"
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
    ui: Object
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
