<template>
  <div class="table-wrapper">
    <div class="d-flex">
      <div>
        <slot name="left"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
    <div>
      <slot name="default"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "table-wrapper",
});
</script>

<style lang="less" scoped>
.table-wrapper {
  margin-bottom: 12px;
  .right {
    margin-left: auto;
  }
}
</style>
