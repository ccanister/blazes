<template>
  <div>
    <a-switch
      v-model:checked="model$"
      :disabled="schema.readOnly"
      :checked-children="ui.checkedChildren"
      :un-checked-children="ui.unCheckedChildren"
      @change="change"
    />
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

    const change = () => {
      props.ui?.change && props.ui.change(model$.value);
    };

    return { model$, change };
  },
});
</script>

<style scoped lang="less"></style>
