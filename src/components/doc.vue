<template>
  <div class="doc-wrapper markdown">
    <a-row>
      <a-col :md="6" :lg="6" :xl="5" :xxl="4">
        <a-affix>
          <main-menu></main-menu>
        </a-affix>
      </a-col>
      <a-col :md="18" :lg="18" :xl="19" :xxl="20">
        <div class="main-container">
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
      </a-col>
    </a-row>
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
  padding: 40px 0 0;
  .main-container {
    min-height: 500px;
    padding: 0 170px 32px 64px;
    .demo-title {
      padding: 32px 0 24px 0;
    }
  }
}
</style>
