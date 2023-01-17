<template>
  <div>
    <a-radio-group
      v-if="ui.type === 'button'"
      v-model:value="model"
      :disabled="schema.readOnly"
      :buttonStyle="ui.buttonStyle"
      @change="change"
    >
      <a-radio-button
        v-for="item in list"
        :key="item.value"
        :value="item.value"
        >{{ item.label }}</a-radio-button
      >
    </a-radio-group>
    <a-radio-group
      v-else
      :options="list"
      v-model:value="model"
      :disabled="schema.readOnly"
      @change="change"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, toRaw } from "vue";
import { getData, StringProperty } from "@blazes/abc/lib/sf";
import Radio from "ant-design-vue/es/radio";
import type {
  ISFUISchemaItem,
  SFValue,
  ISFSchema,
} from "@blazes/abc/lib/sf/src/type";
import { object } from "vue-types";

export default defineComponent({
  name: "sf-radio",
  props: {
    property: object<StringProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFSchema>().isRequired,
  },
  components: {
    [Radio.name]: Radio,
    [Radio.Group.name]: Radio.Group,
    [Radio.Button.name]: Radio.Button,
  },
  setup(props) {
    const property = toRaw(props.property);
    const { ui, schema } = toRaw(props);
    const model = ref(property.value);
    const list: Ref<any[]> = ref([]);
    getData(schema, ui, model.value).then((result) => {
      list.value = result;
    });
    const setValue = (value: string) => {
      model.value = value;
    };
    const change = () => {
      if (ui.change) {
        ui.change(model.value);
      }
      property.setValue(model.value);
    };
    const reset = (value: SFValue) => {
      model.value = value;
      property.setValue(value);
    };

    return { model, list, setValue, change, reset };
  },
});
</script>
