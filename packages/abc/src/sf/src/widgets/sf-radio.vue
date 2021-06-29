<template>
  <div>
    <a-radio-group :options="list" v-model:value="model$" @change="change" />
  </div>
</template>

<script lang="ts">
import { useModel } from "@blazes/utils";
import { defineComponent, Ref, ref } from "vue";
import { ISFSchema, ISFUISchemaItem } from "../type";
import { getData } from "@blazes/abc//lib/sf";
import Radio from "ant-design-vue/lib/radio";

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
    const change = () => {
      props.ui?.change && props.ui.change(model$.value);
    };

    return { model$, list, setValue, change };
  },
});
</script>
