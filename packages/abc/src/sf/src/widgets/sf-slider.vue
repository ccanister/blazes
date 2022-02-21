<template>
  <div>
    <a-slider
      v-model:value="model"
      :disabled="schema.readOnly"
      :min="schema.minimum"
      :max="schema.maximum"
      :step="schema.multipleOf"
      :range="ui.range"
      @change="changeValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from "vue";
import Slider from "ant-design-vue/es/slider";
import { object } from "vue-types";
import { AtomicProperty } from "@blazes/abc/lib/sf";
import {
  ISFSchema,
  ISFUISchemaItem,
  SFValue,
} from "@blazes/abc/lib/sf/src/type";

export default defineComponent({
  name: "sf-slider",
  components: { [Slider.name]: Slider },
  props: {
    property: object<AtomicProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFSchema>().isRequired,
  },
  setup(props) {
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

    return { model, changeValue, reset };
  },
});
</script>

<style scoped lang="less"></style>
