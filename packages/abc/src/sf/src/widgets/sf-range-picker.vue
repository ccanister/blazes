<template>
  <div>
    <a-range-picker
      v-model:value="model"
      :disabledDate="ui.disabledDate"
      :separator="ui.separator"
      :format="ui.format"
      @change="changeValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from "vue";
import DatePicker from "ant-design-vue/lib/date-picker";
import { AtomicProperty } from "../model";
import {
  ISFSchema,
  ISFUISchemaItem,
  SFValue,
} from "@blazes/abc/lib/sf/src/type";
import { object } from "vue-types";

export default defineComponent({
  name: "sf-range-picker",
  props: {
    property: object<AtomicProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFSchema>().isRequired,
  },
  components: {
    [DatePicker.name]: DatePicker,
    [DatePicker.RangePicker.name]: DatePicker.RangePicker,
  },
  setup(props) {
    const property = toRaw(props.property);
    const model = ref(toRaw(property.value));

    const changeValue = () => {
      console.log(model.value);
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
