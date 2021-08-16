<template>
  <a-row :gutter="sv.gutter" class="sv-wrapper">
    <a-col
      v-for="option in sv.options"
      :key="option.label"
      class="item"
      :class="option.class"
    >
      <div class="label">{{ option.label }}</div>
      <div class="detail">
        <slot
          :name="option.renderValue"
          v-if="option.renderValue"
          :value="option.value"
        ></slot>
        <template v-else>
          {{ option.value }}
        </template>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Sv } from "./type";
import { responseService } from "@blazes/theme";

export default defineComponent({
  name: "sv",
  props: {
    isv: Object,
    data: Object,
  },
  setup(props) {
    const sv = ref({});
    watch(
      props,
      ({ isv, data }) => {
        const newSv = new Sv(isv as any, data);
        newSv.options = newSv.options.map((option) => {
          option.class = responseService
            .genClass(option.col)
            .concat(option.class);
          return option;
        });
        sv.value = newSv;
      },
      { immediate: true }
    );

    return { sv };
  },
});
</script>
<style lang="less" scoped>
.sv-wrapper {
  .item {
    display: flex !important;
    .label {
      padding-bottom: 16px;
      line-height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      color: rgba(0, 0, 0, 0.5);
      &::after {
        content: "\ff1a";
      }
    }
    .detail {
      padding-bottom: 16px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.85);
    }
    .label,
    .detail {
      display: flex;
      align-items: center;
    }
  }
}
</style>
