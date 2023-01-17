<template>
  <a-input
    :placeholder="ui.placeholder"
    v-model:value="model"
    @keyup.enter="changeValue"
  >
    <template #suffix>
      <CloseOutlined v-if="model" @click="clear" />
      <SearchOutlined v-else @click="changeValue" />
    </template>
  </a-input>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from "vue";
import SearchOutlined from "@ant-design/icons-vue/SearchOutlined";
import CloseOutlined from "@ant-design/icons-vue/CloseOutlined";
import { StringProperty } from "@blazes/abc/lib/sf";
import type {
  ISFUISchemaItem,
  ISFSchema,
  SFValue,
} from "@blazes/abc/lib/sf/src/type";
import { object } from "vue-types";

export default defineComponent({
  name: "search-input",
  components: {
    SearchOutlined,
    CloseOutlined,
  },
  props: {
    property: object<StringProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFSchema>().isRequired,
  },
  setup(props, context) {
    const property = toRaw(props.property);
    const model = ref(property.value);
    const { ui } = toRaw(props);

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

    const clear = () => {
      model.value = "";
      changeValue();
    };

    return { model, changeValue, reset, clear };
  },
});
</script>
