<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./header.vue";

export default defineComponent({
  name: "layout",
  components: { Header },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less"></style>
