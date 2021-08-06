<template>
  <div>
    <a-checkbox v-if="label" v-model:checked="model" @change="changeValue">
      {{ label }}
    </a-checkbox>
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
import { defineComponent, Ref, ref, toRaw } from "vue";
import { useChecked } from "@blazes/utils";
import Checkbox from "ant-design-vue/lib/checkbox";
import { AtomicProperty, getData } from "@blazes/abc/lib/sf";
import {
  ISFSchema,
  ISFUISchemaItem,
  SFValue,
} from "@blazes/abc/lib/sf/src/type";
import { ISFSchemaEnum } from "../type";
import { object } from "vue-types";

export default defineComponent({
  name: "sf-checkbox",
  props: {
    property: object<AtomicProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFSchema>().isRequired,
  },
  components: {
    [Checkbox.name]: Checkbox,
  },
  setup(props) {
    const property = toRaw(props.property);
    const model = ref(property.value);
    const { ui, schema } = toRaw(props);
    const label = ui.label || "";
    const girdSpan = ui.span;
    const checkAll = ui.checkAll;
    const checkAllText = ui.checkAllText || "全选";
    const all = useChecked<ISFSchemaEnum>([]);
    const list: Ref<any[]> = ref([]);
    getData(schema, ui, model.value).then((result) => {
      list.value = result;
      all.resetItems(result);
    });

    const changeValue = () => {
      if (ui.change) {
        ui.change(model.value);
      }
      property.setValue(model.value);
    };
    const updateModel = () => {
      model.value = list.value.filter((l) => l.checked).map((l) => l.label);
      changeValue();
    };

    const checkApart = () => {
      all.updateChecked();
      updateModel();
    };

    const changeCheckAll = () => {
      all.checkAll();
      updateModel();
    };

    const reset = (value: SFValue) => {
      model.value = value;
      property.setValue(value);
    };

    return {
      model,
      label,
      girdSpan,
      list,
      checkAllText,
      checkAll,
      all,
      checkApart,
      changeCheckAll,
      changeValue,
      reset,
    };
  },
});
</script>

<style scoped lang="less"></style>
