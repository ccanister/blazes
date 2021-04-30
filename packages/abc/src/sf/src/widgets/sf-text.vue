<template>
  <span>{{ modelValue || ui.defaultText || "-" }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "sf-input",
  props: {
    modelValue: [String, Number, Boolean],
    ui: Object
  }
});
</script>
