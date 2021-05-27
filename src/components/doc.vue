<template>
  <div class="doc-wrapper markdown">
    <h1 class="title markdown">{{ item.subtitle }}</h1>
    <div v-html="item.content"></div>
    <div v-if="item.demo">
      <h2 class="demo-title">代码演示</h2>
      <slot></slot>
    </div>
    <div class="markdown api-container">
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

<style scoped lang="less">
@import "./markdown.less";
.doc-wrapper {
  .demo-title {
    padding: 32px 0 24px 0;
  }
}
</style>
