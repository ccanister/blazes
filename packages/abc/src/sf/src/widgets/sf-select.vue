<template>
  <div>
    <a-select
      v-model:value="model"
      :placeholder="ui.placeholder"
      :mode="mode"
      :disabled="schema.readOnly"
      :allowClear="ui.allowClear"
      :bordered="ui.bordered"
      :dropdownClassName="ui.dropdownClassName"
      :dropdownStyle="ui.dropdownStyle"
      :maxTagCount="ui.maxTagCount"
      :notFoundContent="ui.notFoundContent"
      :showSearch="ui.showSearch"
      :filterOption="ui.filterOption"
      :options="list"
      @change="changeValue"
    >
    </a-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, toRaw } from "vue";
import type {
  ISFSchema,
  ISFUISchemaItem,
  SFValue,
} from "@blazes/abc/lib/sf/src/type";
import { AtomicProperty, getData } from "@blazes/abc/lib/sf";
import { object } from "vue-types";

export default defineComponent({
  name: "sf-select",
  props: {
    property: object<AtomicProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFSchema>().isRequired,
  },
  setup(props) {
    // 直接解构toRaw是不行的
    const property = toRaw(props.property);
    const { ui, schema } = toRaw(props);
    const model = ref(property.value);
    const list: Ref<any[]> = ref([]);
    const mode = ui.mode || null;
    getData(schema, ui, model.value).then((result) => {
      list.value = result;
    });
    const resetList = (result: any) => {
      list.value = result;
    };
    const changeValue = () => {
      if (ui.change) {
        ui.change(model.value);
      }
      property.setValue(model.value);
    };

    const reset = (value: SFValue) => {
      model.value = value;
      property.setValue(value);
    };

    return { model, list, mode, reset, resetList, changeValue };
  },
});
</script>
