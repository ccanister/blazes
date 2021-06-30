<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";
import {
  MainMenuService,
  mainMenuServiceSymbol,
} from "@/utils/main-menu.service";
import zhCN from "ant-design-vue/es/locale/zh_CN";

export default defineComponent({
  name: "App",
  setup() {
    const mainMenuService = new MainMenuService();
    provide(mainMenuServiceSymbol, mainMenuService);

    return { zhCN };
  },
});
</script>

<style scoped lang="less"></style>
