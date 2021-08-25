<template>
  <div>
    <a-date-picker
      v-model:value="model"
      :disabledDate="ui.disabledDate"
      :format="ui.format"
      :show-time="ui.showTime"
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
  name: "sf-date",
  props: {
    property: object<AtomicProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFSchema>().isRequired,
  },
  components: {
    [DatePicker.name]: DatePicker,
  },
  setup(props) {
    const property = toRaw(props.property);
    const model = ref(toRaw(property.value));

    const changeValue = () => {
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
