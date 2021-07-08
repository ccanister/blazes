const source = `
<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <Child />
    </div>
  </a-config-provider>
</template>

<script lang="ts">
import Child from "./child.vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";

export default {
  name: "App",
  components: { Child },
  setup() {
    return { zhCN };
  }
};
</script>
<style scoped>
#app {
  margin-top: 12px;
}
</style>
`;

export default source;
