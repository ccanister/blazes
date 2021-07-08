<template>
  <div class="code-box-wrapper">
    <div class="demo">
      <slot></slot>
    </div>
    <div class="meta">
      <div class="title">{{ item.title }}</div>
      <div class="desc" v-html="item.content"></div>
    </div>
    <div class="actions">
      <a-tooltip
        v-for="action in actions"
        :key="action.icon"
        class="icon"
        @click="action.click"
      >
        <template #title>{{ action.tooltip }}</template>
        <component :is="action.icon" />
      </a-tooltip>
    </div>
    <div class="code" v-if="showCode">
      <div v-highlight="item.showCode"><code></code></div>
    </div>
  </div>
</template>

<script lang="ts">
import { object } from "vue-types";
import { defineComponent, Ref, ref, toRaw } from "vue";
import { copy } from "@blazes/utils";
import { escape2Html } from "@/utils/common";
import { message } from "ant-design-vue";
import sdk from "@stackblitz/sdk";
import * as pkg from "../../package.json";
const IndexHtml = require("../../public/resource/template/index-html.js");
const AppVue = require("../../public/resource/template/App-vue");
const MainJs = require("../../public/resource/template/main.js");

const dependencies = {
  "@blazes/abc": "latest",
  "@blazes/utils": "latest",
  "@blazes/theme": "latest",
  "async-validator": "latest",
};

export default defineComponent({
  name: "code-box",
  props: {
    item: object().isRequired,
  },
  setup(props) {
    const code = (toRaw(props).item as { code: string }).code;
    const showCode = ref(false);
    const originActions = [
      {
        icon: "CodeSandboxOutlined",
        tooltip: "在 stackblitz 上打开",
        click: () => {
          sdk.openProject(
            {
              title: "blazes",
              description: `${(props.item as any).title}示例`,
              template: "vue",
              files: {
                "src/main.js": MainJs.default,
                "public/index.html": IndexHtml.default,
                "src/App.vue": AppVue.default,
                "src/child.vue": escape2Html(code),
              },
              dependencies: { ...pkg.dependencies, ...dependencies },
              settings: {
                compile: {
                  trigger: "save",
                },
              },
            },
            {
              openFile: "src/child.vue",
            }
          );
        },
      },
      {
        icon: "CopyOutlined",
        tooltip: "复制代码",
        click: () => {
          copy(escape2Html(code)).then(() => {
            message.success("复制成功");
          });
        },
      },
      {
        icon: "FullscreenOutlined",
        tooltip: "Show Code",
        click: () => {
          showCode.value = true;
          resetActions();
        },
        iif: () => !showCode.value,
      },
      {
        icon: "FullscreenExitOutlined",
        tooltip: "hide Code",
        click: () => {
          showCode.value = false;
          resetActions();
        },
        iif: () => showCode.value,
      },
    ];
    const actions: Ref<any[]> = ref([]);
    const resetActions = () => {
      actions.value = originActions.filter((action) =>
        action.iif ? action.iif() : true
      );
    };
    resetActions();
    return { actions, showCode };
  },
});
</script>

<style scoped lang="less">
.code-box-wrapper {
  position: relative;
  margin: 0 0 16px;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  .demo {
    padding: 42px 24px 50px;
    color: rgba(0, 0, 0, 0.85);
    border-bottom: 1px solid #f0f0f0;
  }
  .meta {
    position: relative;
    font-size: 14px;
    border-bottom: 1px dashed #f0f0f0;
    border-radius: 0;
    .title {
      position: absolute;
      top: -14px;
      margin-left: 16px;
      padding: 1px 8px;
      border-radius: 2px 2px 0 0;
      color: rgba(0, 0, 0, 0.85);
    }
    .desc {
      padding: 18px 24px 12px;
      :deep(p) {
        margin: 0;
        color: rgba(0, 0, 0, 0.85);
        code {
          margin: 0 1px;
          padding: 0.2em 0.4em;
          font-size: 0.9em;
          background-color: #f2f4f5;
          border: 1px solid #f0f0f0;
          border-radius: 3px;
        }
      }
    }
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    text-align: center;
    opacity: 0.7;
    .icon {
      &:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
  .code {
    display: block;
    padding: 16px 32px;
    color: rgba(0, 0, 0, 0.85);
    border-radius: 2px;
  }
}
</style>
