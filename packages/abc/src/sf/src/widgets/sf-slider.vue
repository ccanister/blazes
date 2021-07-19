<template>
  <div>
    <a-slider
      v-model:value="model$"
      :disabled="schema.readOnly"
      :min="ui.min"
      :max="ui.max"
      :step="ui.step"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Slider from "ant-design-vue/lib/slider";
import { useModel } from "@blazes/utils";

export default defineComponent({
  name: "sf-slider",
  components: { [Slider.name]: Slider },
  props: {
    modelValue: {
      default: "0",
      type: String,
    },
    ui: Object,
    schema: Object,
  },
  setup(props, context) {
    const model$ = useModel<any>(props, context);

    return { model$ };
  },
});
</script>

<style scoped lang="less"></style>
