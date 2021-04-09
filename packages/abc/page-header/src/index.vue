<template>
  <div class="page-header">
    <div class="breadcrumb">
      <a-breadcrumb separator="/">
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
    <div class="detail fx">
      <div v-if="$slots.logo" class="logo">
        <slot name="logo"></slot>
      </div>
      <div class="main">
        <div class="row">
          <h1 class="title">{{ title$ }}</h1>
          <div v-if="$slots.action" class="action">
            <slot name="action"></slot>
          </div>
        </div>
        <div class="row">
          <div class="desc" v-if="$slots.default">
            <slot></slot>
          </div>
          <div v-if="$slots.extra" class="extra">
            <slot name="extra"></slot>
          </div>
        </div>
      </div>
    </div>
    <slot name="tab"></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import menuService from "@blazes/theme/src/services/menu/menu.service";
import { ArrayService } from "@blazes/utils";
import { IMenu } from "@blazes/theme";

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
  border-bottom: 1px solid #ebeef5;
  background-color: #fff;
  .breadcrumb {
    margin-bottom: 16px;
  }
  .detail {
    .logo {
      margin: 0 16px 16px 0;
      flex: 1 1 auto;
    }
    .main {
      width: 100%;
      flex: 0 1 auto;
      .title {
        margin: 0 0 16px 0;
        flex: auto;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        font-size: 20px;
      }
      .action {
        margin-bottom: 16px;
        flex: 0 1 auto;
        text-align: right;
      }
      .desc {
        margin-bottom: 16px;
        flex: auto;
      }
      .extra {
        min-width: 240px;
        margin: 0 0 16px 88px;
        flex: 0 1 auto;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
      }
    }
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
