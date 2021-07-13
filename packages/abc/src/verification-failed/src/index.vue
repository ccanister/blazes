<template>
  <div class="verification-failed-wrapper">
    <div class="image"><Icon /></div>
    <div class="title">403</div>
    <div class="subtitle">对不起，您没有查看页面的权限</div>
    <div class="extra">
      <a-button type="primary" @click="back"> {{ btnText }} </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "./icon.vue";

export default defineComponent({
  name: "verification-failed",
  components: { Icon },
  props: {
    btnText: {
      type: String,
      default: "返回首页",
    },
  },
  emits: { back: null },
  setup(props, { emit }) {
    const back = () => {
      emit("back");
    };
    return { back };
  },
});
</script>

<style scoped lang="less">
.verification-failed-wrapper {
  padding: 48px 32px;
  .image {
    width: 250px;
    height: 295px;
    margin-bottom: 24px;
    margin: auto;
    text-align: center;
  }
  .title {
    color: rgba(0, 0, 0, 0.85);
    font-size: 24px;
    line-height: 1.8;
    text-align: center;
  }
  .subtitle {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 1.6;
    text-align: center;
  }
  .extra {
    margin: 24px 0 0;
    text-align: center;
  }
}
</style>
