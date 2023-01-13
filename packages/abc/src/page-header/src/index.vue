<template>
  <div class="page-header">
    <div class="breadcrumb">
      <template v-if="$slots.breadcrumb">
        <slot name="breadcrumb"></slot>
      </template>
      <a-breadcrumb v-else separator="/">
        <a-breadcrumb-item v-for="path in paths" :key="path.text">
          <router-link v-if="path.link" :to="path.link">
            {{ path.text }}
          </router-link>
          <template v-else>
            {{ path.text }}
          </template>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <slot name="tab"></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { ArrayService } from "@blazes/utils";
import { IMenu, menuService } from "@blazes/theme";

export default defineComponent({
  name: "page-header",
  props: {
    title: String,
  },
  setup(props) {
    const route = useRoute();
    const curMatch = ArrayService.getLast(route.matched);
    // 返回的路径最后一个不一定等于url
    const paths = curMatch ? menuService.getPathByUrl(curMatch?.path) : [];
    if (curMatch && ArrayService.getLast(paths)?.link !== curMatch.path) {
      paths.push({
        text: curMatch.name as string,
        link: curMatch.path,
      } as IMenu);
    }
    const title$ = computed(
      () => props.title || ArrayService.getLast(paths)?.text
    );

    return { paths, title$ };
  },
});
</script>
<style lang="less" scoped>
.page-header {
  padding: 12px 24px 0;
  margin-bottom: 24px;
  margin-left: -24px;
  margin-right: -24px;
  border-bottom: 1px solid #dee0e3;
  background-color: #fff;
  .breadcrumb {
    margin-bottom: 12px;
  }
  .row {
    display: flex;
    width: 100%;
  }
  :deep(.ant-tabs) {
    margin: 0 0 -16px;
    .ant-tabs__nav-wrap::after {
      background-color: transparent;
    }
  }
}
</style>
