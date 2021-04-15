<template>
  <a-radio-group :options="list" v-model:value="model$" />
</template>

<script lang="ts">
import { useModel } from "@blazes/utils";
import { defineComponent, Ref, ref } from "vue";
import { ISFSchema, ISFUISchemaItem } from "../type";
import { getData } from "../util";
import { Radio } from "ant-design-vue";

export default defineComponent({
  name: "sf-select",
  props: {
    modelValue: [String, Boolean, Number, Array],
    ui: Object,
    schema: Object,
  },
  components: {
    [Radio.name]: Radio,
    [Radio.Group.name]: Radio.Group,
    [Radio.Button.name]: Radio.Button,
  },
  setup(props, context) {
    const model$ = useModel<any>(props, context);
    const list: Ref<any[]> = ref([]);
    getData(
      props.schema as ISFSchema,
      props.ui as ISFUISchemaItem,
      model$.value
    ).then((result) => {
      list.value = result;
    });
    const setValue = (value: string) => {
      model$.value = value;
    };

    return { model$, list, setValue };
  },
});
</script>
