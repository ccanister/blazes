<template>
  <a-tag :color="tagMap[value]?.color">{{ tagMap[value]?.text }}</a-tag>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { TagColor } from "@blazes/utils";

export default defineComponent({
  name: "tags",
  props: {
    tagMap: Object,
    value: [Number, String],
  },
  setup() {
    return { TagColor };
  },
});
</script>

<style lang="less" scoped></style>
