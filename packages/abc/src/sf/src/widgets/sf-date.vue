<template>
  <div>
    <a-month-picker
      v-if="mode === 'month'"
      v-model:value="model"
      :disabledDate="ui.disabledDate"
      :format="ui.format"
      :placeholder="ui.placeholder"
      :dropdownClassName="ui.dropdownClassName"
      @change="changeValue"
      :locale="locale"
      :allowClear="ui.allowClear"
    />
    <a-week-picker
      v-else-if="mode === 'week'"
      v-model:value="model"
      :disabledDate="ui.disabledDate"
      :format="ui.format"
      :placeholder="ui.placeholder"
      :dropdownClassName="ui.dropdownClassName"
      @change="changeValue"
      :locale="locale"
      :allowClear="ui.allowClear"
    />
    <a-date-picker
      v-else
      v-model:value="model"
      :disabledDate="ui.disabledDate"
      :format="ui.format"
      :placeholder="ui.placeholder"
      :show-time="ui.showTime"
      :dropdownClassName="ui.dropdownClassName"
      @change="changeValue"
      :locale="locale"
      :allowClear="ui.allowClear"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from "vue";
import DatePicker from "ant-design-vue/es/date-picker";
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
    const property = toRaw(props.property);
    const { ui } = toRaw(props);
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
