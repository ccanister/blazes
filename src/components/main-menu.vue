<template>
  <div class="main-menu-wrapper">
    <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
      <a-menu-item-group v-for="menu in menus" :key="menu.type">
        <template #title>
          <span>{{ menu.type }}</span>
        </template>
        <a-menu-item v-for="sub in menu.subs" :key="sub.title">
          <div class="title-wrapper">
            <router-link :to="sub.path">
              <span class="title">{{ sub.title }}</span>
              <span class="subtitle">{{ sub.subtitle }}</span>
              <a-tag color="processing" v-if="sub.redirect" class="tag"
                >Lib</a-tag
              >
            </router-link>
          </div>
        </a-menu-item>
      </a-menu-item-group>
    </a-menu>
  </div>
</template>

<script lang="ts">
import {
  MainMenuService,
  mainMenuServiceSymbol,
} from "@/utils/main-menu.service";
import { useRoute } from "vue-router";
import { defineComponent, inject, onMounted, Ref, ref } from "vue";

export default defineComponent({
  name: "main-menu",
  setup() {
    const { menus } = inject(mainMenuServiceSymbol) as MainMenuService;
    const selectedKeys: Ref<string[]> = ref([]);
    const route = useRoute();
    onMounted(() => {
      let title = "";
      menus.forEach((menu) => {
        menu.subs.forEach((sub) => {
          if (sub.path === route.path) {
            title = sub.title;
          }
        });
      });
      selectedKeys.value = [title];
    });

    return { menus, selectedKeys };
  },
});
</script>

<style scoped lang="less">
.main-menu-wrapper {
  height: 100%;
  .ant-menu {
    :deep(.ant-menu-item-group) {
      .ant-menu-item-group-title,
      .ant-menu-item {
        padding-left: 40px !important;
      }
      .ant-menu-item-group-title {
        position: relative;
        margin-bottom: 12px;
        font-size: 13px;
        &::after {
          content: " ";
          position: absolute;
          bottom: 0;
          left: 40px;
          right: 40px;
          height: 1px;
          background-color: #f0f0f0;
        }
      }
      .ant-menu-item {
        .title-wrapper {
          display: flex;
          align-items: center;
          a {
            display: inline-block;
            width: 100%;
          }
          .title {
            color: rgba(0, 0, 0, 0.85);
            margin-right: 8px;
          }
          .subtitle {
            color: rgba(0, 0, 0, 0.85);
          }
        }
      }
    }
  }
  .tag {
    margin-left: 8px;
  }
}
</style>
