<template>
  <div>
    <a-switch v-model:checked="model$" :disabled="schema.readOnly" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Switch from "ant-design-vue/lib/switch";
import { useModel } from "@blazes/utils";

export default defineComponent({
  name: "sf-switch",
  components: { [Switch.name]: Switch },
  props: {
    modelValue: [String, Number, Boolean],
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
