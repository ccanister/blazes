<template>
  <div>
    <a-month-picker
      v-if="mode === 'month'"
      v-model:value="model"
      :disabledDate="ui.disabledDate"
      :format="ui.format"
      :placeholder="ui.placeholder"
      @change="changeValue"
      :locale="locale"
    />
    <a-week-picker
      v-if="mode === 'week'"
      v-model:value="model"
      :disabledDate="ui.disabledDate"
      :format="ui.format"
      :placeholder="ui.placeholder"
      @change="changeValue"
      :locale="locale"
    />
    <a-date-picker
      v-else
      v-model:value="model"
      :disabledDate="ui.disabledDate"
      :format="ui.format"
      :placeholder="ui.placeholder"
      :show-time="ui.showTime"
      @change="changeValue"
      :locale="locale"
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
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";

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
    const { property, ui } = toRaw(props);
    const model = ref(toRaw(property.value));
    const mode = ui.mode || "date";

    const changeValue = () => {
      property.setValue(model.value);
    };
    const reset = (value: SFValue) => {
      model.value = value;
      property.setValue(value);
    };

    return { model, changeValue, reset, locale, mode };
  },
});
</script>
