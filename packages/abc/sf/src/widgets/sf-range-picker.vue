<template>
  <a-range-picker v-model:value="model$" />
</template>

<script lang="ts">
import { useModel } from "@blazes/utils";
import { defineComponent } from "vue";
import { DatePicker } from "ant-design-vue";

export default defineComponent({
  name: "sf-select",
  props: {
    modelValue: [String, Boolean, Number, Array],
    ui: Object,
    schema: Object,
  },
  components: {
    [DatePicker.name]: DatePicker,
    [DatePicker.RangePicker.name]: DatePicker.RangePicker,
  },
  setup(props, context) {
    const model$ = useModel<any>(props, context);

    const setValue = (value: string) => {
      model$.value = value;
    };

    return { model$, setValue };
  },
});
</script>
