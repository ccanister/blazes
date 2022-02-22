<template>
  <div class="sf-object">
    <a-row>
      <template v-for="item in property.properties" :key="item">
        <a-col
          :span="item.ui.gutter.span"
          :style="{
            width: item.ui.gutter.spanLabelFixed
              ? item.ui.gutter.spanLabelFixed + 'px'
              : 'auto',
          }"
          :class="{ hideFlex: item.ui.gutter.spanLabelFixed }"
          v-if="item._visibilityChanges && !item.hidden"
        >
          <sf-item :ui="item.ui" :schema="item.schema">
            <component
              :ui="item.ui"
              :schema="item.schema"
              :property="item"
              :is="item.ui.widget"
              :ref="property.addWidget(item.path)"
            ></component>
            <template v-if="slots[item.ui.prop]" v-slot:[item.ui.prop]>
              <v-nodes
                :vnodes="renderSlot(slots[item.ui.prop], ui, item.schema)"
              />
            </template>
          </sf-item>
        </a-col>
      </template>
    </a-row>
  </div>
</template>

<script lang="ts">
import { ISFSchema, ISFUISchemaItem } from "../type";
import { defineComponent, toRaw } from "vue";
import { object } from "vue-types";
import { ObjectProperty } from "../model";
import SfItem from "./sf-item.vue";

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

    return { renderSlot };
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
