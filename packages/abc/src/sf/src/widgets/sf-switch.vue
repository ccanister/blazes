<template>
  <div>
    <a-switch
      v-model:checked="model"
      :disabled="schema.readOnly"
      :checked-children="ui.checkedChildren"
      :un-checked-children="ui.unCheckedChildren"
      @change="change"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from "vue";
import Switch from "ant-design-vue/lib/switch";
import { BooleanProperty } from "@blazes/abc/lib/sf";
import { object } from "vue-types";
import { ISFSchema, ISFUISchemaItem } from "@blazes/abc/lib/sf/src/type";

export default defineComponent({
  name: "sf-switch",
  components: { [Switch.name]: Switch },
  props: {
    property: object<BooleanProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFSchema>().isRequired,
  },
  setup(props) {
    const property = toRaw(props.property);
    const model = ref(property.value);

    const change = () => {
      if (props.ui.change) {
        props.ui.change(model.value);
      }
      property.setValue(model.value);
    };

    return { model, change };
  },
});
</script>

<style scoped lang="less"></style>
