<template>
  <a-row class="header-wrapper">
    <a-col
      :xs="24"
      :sm="24"
      :md="24"
      :lg="24"
      :xl="5"
      :xxl="4"
      class="logo-wrapper"
    >
      <h1>
        <router-link class="logo" to="/">
          <img src="../assets/images/logo.png" alt="vue-alian" />
          VUE-ALIAN
        </router-link>
      </h1>
    </a-col>
    <a-col :xs="0" :sm="0" :md="0" :lg="0" :xl="19" :xxl="20">
      <div class="right">
        <a-menu
          class="navs"
          v-model:selectedKeys="selectedKeys"
          mode="horizontal"
        >
          <a-menu-item v-for="nav in navs" :key="nav.value">
            <router-link :to="'/' + nav.value">{{ nav.label }}</router-link>
          </a-menu-item>
        </a-menu>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { defineComponent, ref, Ref, watch } from "vue";

const navs = [
  { label: "文档", value: "docs" },
  { label: "组件", value: "components" },
];

export default defineComponent({
  setup() {
    const selectedKeys: Ref<string[]> = ref([]);
    const route = useRoute();
    watch(
      () => route.path,
      (url) => {
        const suffix = url.split("/")[1];
        selectedKeys.value = [navs.find((nav) => nav.value === suffix)?.value || "docs"];
      },
      { immediate: true }
    );
    return { selectedKeys, navs };
  },
});
</script>

<style scoped lang="less">
.header-wrapper {
  position: relative;
  max-width: 100%;
  height: 64px;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  .logo-wrapper {
    position: relative;
    &::after {
      content: " ";
      position: absolute;
      top: 16px;
      right: 0;
      height: 32px;
      border-right: 1px solid #f0f0f0;
    }
    .logo {
      height: 64px;
      padding-left: 40px;
      line-height: 64px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 18px;
      img {
        margin-right: 16px;
        height: 32px;
        max-height: 32px;
      }
    }
  }
  .right {
    display: flex;
    .navs {
      margin-left: auto;
      margin-right: 24px;
      :deep(.ant-menu-item) {
        min-width: 72px;
        height: 64px;
        line-height: 64px;
        border-top: 2px solid transparent;
        margin-right: 24px;
        transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
          border-top-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
          background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
          padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
        &.ant-menu-item-selected,
        &:hover {
          border-top: 2px solid #1890ff;
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
