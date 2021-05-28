<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";
import {
  MainMenuService,
  mainMenuServiceSymbol,
} from "@/utils/main-menu.service";

export default defineComponent({
  name: "App",
  setup() {
    const mainMenuService = new MainMenuService();
    provide(mainMenuServiceSymbol, mainMenuService);
  },
});
</script>

<style scoped lang="less"></style>
