<template>
  <div>
    <a-checkbox v-model:checked="model$"> {{ label }} </a-checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useModel } from "@blazes/utils";
import Checkbox from "ant-design-vue/lib/checkbox";

export default defineComponent({
  name: "sf-checkbox",
  props: {
    modelValue: [String, Boolean, Number, Array],
    ui: Object,
    schema: Object,
  },
  components: {
    [Checkbox.name]: Checkbox,
  },
  setup(props, context) {
    const model$ = useModel<any>(props, context);
    const label = props.ui?.label || "";

    return { model$, label };
  },
});
</script>

<style scoped lang="less"></style>
