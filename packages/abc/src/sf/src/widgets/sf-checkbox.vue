<template>
  <div>
    <a-checkbox v-if="label" v-model:checked="model$"> {{ label }} </a-checkbox>
    <template v-else>
      <template v-if="girdSpan">
        <a-row>
          <a-col v-if="checkAll" :span="girdSpan">
            <a-checkbox
              v-model:checked="all.checked.all"
              :indeterminate="all.checked.indeterminate"
              @change="changeCheckAll"
            >
              {{ checkAllText }}
            </a-checkbox>
          </a-col>
          <a-col :span="girdSpan" v-for="item in list" :key="item">
            <a-checkbox
              v-model:checked="item.checked"
              @change="checkApart(item)"
              >{{ item.label }}</a-checkbox
            >
          </a-col>
        </a-row>
      </template>
      <template v-else>
        <a-checkbox
          v-if="checkAll"
          v-model:checked="all.checked.all"
          :indeterminate="all.checked.indeterminate"
          @change="changeCheckAll"
        >
          {{ checkAllText }}
        </a-checkbox>
        <a-checkbox
          v-model:checked="item.checked"
          v-for="item in list"
          :key="item"
          @change="checkApart(item)"
        >
          {{ item.label }}</a-checkbox
        >
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { useModel, useChecked } from "@blazes/utils";
import Checkbox from "ant-design-vue/lib/checkbox";
import { getData } from "@blazes/abc/lib/sf";
import { ISFSchema, ISFUISchemaItem } from "@blazes/abc/lib/sf/src/type";
import { ISFSchemaEnum } from "../type";

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
    const ui = props.ui as ISFUISchemaItem;
    const label = ui.label || "";
    const girdSpan = ui.span;
    const checkAll = ui.checkAll;
    const checkAllText = ui.checkAllText || "全选";
    const all = useChecked<ISFSchemaEnum>([]);
    const list: Ref<any[]> = ref([]);
    getData(
      props.schema as ISFSchema,
      props.ui as ISFUISchemaItem,
      model$.value
    ).then((result) => {
      list.value = result;
      all.resetItems(result);
    });

    const updateModel = () => {
      model$.value = list.value.filter((l) => l.checked).map((l) => l.label);
    };

    const checkApart = (item: ISFSchemaEnum) => {
      all.updateChecked();
      updateModel();
    };

    const changeCheckAll = () => {
      all.checkAll();
      updateModel();
    };

    return {
      model$,
      label,
      girdSpan,
      list,
      checkAllText,
      checkAll,
      all,
      checkApart,
      changeCheckAll,
    };
  },
});
</script>

<style scoped lang="less"></style>
