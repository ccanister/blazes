<template>
  <a-form-item
    :name="ui.prop"
    :rules="ui.rules"
    :class="ui.class"
    :style="{ width: ui.gutter.controlWidth }"
    :wrapperCol="{
      span: ui.gutter.spanControl,
      offset: ui.gutter.controlOffset,
    }"
    :labelCol="{
      span: ui.gutter.spanLabel,
      offset: ui.gutter.spanOffset,
    }"
    :labelAlign="ui.labelAlign"
    :colon="!ui.noColon"
    :extra="schema.description"
  >
    <template #label>
      <slot v-if="$slots[ui.prop]" :name="ui.prop" :schema="schema"></slot>
      <template v-else>
        <span class="title">
          {{ schema.title }}
          <a-tooltip v-if="ui.optionalHelp">
            <template #title>{{ ui.optionalHelp }} </template>
            <QuestionCircleOutlined class="help" />
          </a-tooltip>
        </span>
      </template>
    </template>
    <slot></slot>
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { object } from "vue-types";
import { ISFSchema, ISFUISchemaItem } from "../type";

export default defineComponent({
  name: "sf-item",
  props: {
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFSchema>().isRequired,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less">
.sf-item {
}
</style>
