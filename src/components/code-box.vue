<template>
  <div class="code-box-wrapper">
    <slot></slot>
    <div class="title">{{ item.title }}</div>
  </div>
</template>

<script lang="ts">
import { object } from "vue-types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "code-box",
  props: {
    item: object().isRequired,
  },
  //   setup() {
  //     return {};
  //   },
});
</script>

<style scoped lang="less"></style>
