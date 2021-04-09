<template>
  <div ref="wrapperRef">
    <div v-if="mode === 'normal'">
      {{ text }}
    </div>
    <a-popover
      v-else
      placement="top"
      :width="400"
      :content="relTooltip"
      trigger="hover"
      :overlayClassName="popperClass"
    >
      <div class="ellipsis">{{ text }}</div>
      <slot name="content">
        <div>{{ relTooltip }}</div>
      </slot>
    </a-popover>
  </div>
</template>

<script lang="ts">
import { toNum } from "@blazes/utils";
import { defineComponent, onMounted, Ref, ref } from "vue";

export default defineComponent({
  name: "ellipsis",
  props: {
    text: String,
    toolTip: String,
    popperClass: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const relTooltip = props.toolTip || props.text;
    const mode = ref("normal");
    const wrapperRef: Ref<HTMLDivElement | null> = ref(null);
    onMounted(() => {
      setTimeout(() => {
        const el = wrapperRef.value;
        const { lineHeight, height } = getComputedStyle(el as HTMLDivElement);
        if (Math.abs(toNum(lineHeight) - toNum(height)) > 1) {
          mode.value = "ellipsis";
        }
      }, 100);
    });

    return { mode, relTooltip, wrapperRef };
  },
});
</script>
<style lang="less" scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
