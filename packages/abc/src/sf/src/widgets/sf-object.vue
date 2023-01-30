<template>
  <div class="sf-object">
    <a-row>
      <template v-for="item in property.properties" :key="item">
        <template v-if="item._visibilityChanges">
          <a-col
            :span="item.ui.gutter.span"
            :style="{
              width: item.ui.gutter.spanLabelFixed
                ? item.ui.gutter.spanLabelFixed + 'px'
                : 'auto',
            }"
            :class="{ hideFlex: item.ui.gutter.spanLabelFixed }"
            v-show="!item.ui.hidden"
          >
            <sf-item :ui="item.ui" :schema="item.schema" :property="item">
              <component
                :ui="item.ui"
                :schema="item.schema"
                :property="item"
                :is="item.ui.widget"
                :ref="property.addWidget(item.path)"
              ></component>
              <template
                v-if="slots && slots[item.ui.prop]"
                v-slot:[item.ui.prop]
              >
                <v-nodes
                  :vnodes="renderSlot(slots[item.ui.prop], ui, item.schema)"
                />
              </template>
            </sf-item>
          </a-col>
        </template>
      </template>
    </a-row>
  </div>
</template>

<script lang="ts">
import { ISFSchema, ISFUISchemaItem, SFValue } from "../type";
import { defineComponent, toRaw } from "vue";
import { object } from "vue-types";
import SfItem from "./sf-item.vue";
import type { FormProperty, ObjectProperty } from "../../";
// vite环境无法使用../
import { resetData } from "../../";

export default defineComponent({
  name: "sf-object",
  components: {
    SfItem,
    VNodes: (_, { attrs }) => {
      return attrs.vnodes;
    } /**无法在Index.vue使用v-slot指令会报错 */,
  },
  props: {
    property: object<ObjectProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFSchema>().isRequired,
    slots: object(),
  },
  setup(props) {
    const property = toRaw(props.property);

    const renderSlot = (slot: any, ui: ISFUISchemaItem, schema: ISFSchema) => {
      return slot({ name: ui.prop, schema });
    };
    const reset = (value: SFValue) => {
      resetData(value, property as FormProperty);
    };

    return { renderSlot, reset };
  },
});
</script>

<style scoped lang="less">
.sf-object {
  .hideFlex {
    flex: none;
  }
  .title {
    .help {
      cursor: pointer;
    }
  }
}
</style>
