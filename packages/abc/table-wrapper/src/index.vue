<template>
  <div class="table-wrapper">
    <div class="fx mb-md">
      <div>
        <slot name="left"></slot>
      </div>
      <div class="m-auto-left">
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
  name: "table-wrapper"
});
</script>
