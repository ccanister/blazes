<template>
  <div>
    <a-checkbox v-if="label" v-model:checked="model$"> {{ label }} </a-checkbox>
    <template v-else>
      <template v-if="girdSpan">
        <div v-if="checkAll">
          <a-checkbox
            v-model:checked="all.checked.all"
            :indeterminate="all.checked.indeterminate"
          >
            {{ checkAllText }}
          </a-checkbox>
        </div>
        <a-checkbox-group v-model:value="model$" class="checkbox-wrapper">
          <a-row>
            <a-col :span="girdSpan">
              <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
            </a-col>
            <a-col :span="girdSpan" v-for="item in list" :key="item">
              <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </template>
      <template v-else>
        <a-checkbox
          v-if="checkAll"
          v-model:checked="all.checked.all"
          :indeterminate="all.checked.indeterminate"
        >
          {{ checkAllText }}
        </a-checkbox>
        <a-checkbox-group
          v-model:value="model$"
          :options="list"
          class="checkbox-wrapper"
        />
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
      if (checkAll && !girdSpan) {
        result = result.concat({ label: checkAllText, value: "all" });
      }
      list.value = result;
      all.resetItems(result);
    });

    return { model$, label, girdSpan, list, checkAllText, checkAll, all };
  },
});
</script>

<style scoped lang="less">
.checkbox-wrapper {
  width: 100%;
}
</style>
