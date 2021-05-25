<template>
  <div class="doc-wrapper">
    <div class="title">{{ item.title }}</div>
    <div v-html="item.content"></div>
    <div v-if="item.demo">
      <div class="title">代码演示</div>
      <slot></slot>
    </div>
    <div class="item.api">
      <div class="api">Api</div>
      <div v-html="item.api"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { object } from "vue-types";

export default defineComponent({
  name: "doc",
  props: {
    item: object().isRequired,
  },
  //   setup() {
  //     return {}
  //   }
});
</script>

<style scoped lang="less"></style>
