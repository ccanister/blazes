<template>
  <a-textarea
    :placeholder="ui.placeholder"
    v-model:value="model$"
    :rows="ui.rows"
    :autoSize="ui.autosize"
  ></a-textarea>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useModel } from "@flame/utils";
import { Input } from "ant-design-vue";

export default defineComponent({
  name: "sf-input",
  props: {
    modelValue: [String, Number, Boolean],
    ui: Object
  },
  components: {
    [Input.TextArea.name]: Input.TextArea
  },
  setup(props, context) {
    const model$ = useModel<any>(props, context);

    return { model$ };
  }
});
</script>
