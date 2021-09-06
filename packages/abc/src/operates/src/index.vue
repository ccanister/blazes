<template>
  <template v-if="type === OperateType.Button">
    <a-button-group>
      <template v-for="btn in operates$" :key="btn.text">
        <a-dropdown v-if="btn._children.length > 0">
          <a-button :type="btn.buttonType" :icon="btn.icon">
            <span v-html="btn._text"></span>
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item
                v-for="subBtn in btn._children"
                :key="subBtn._text"
                @click="operateClick(subBtn)"
              >
                <span v-html="subBtn._text"></span>
                <i :class="subBtn.icon"></i>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <template v-else>
          <a-popconfirm
            v-if="btn.type === 'popconfirm'"
            :title="btn.popconfirm.title"
            @confirm="btn.popconfirm.confirm(record)"
          >
            <a-button :type="btn.buttonType" :icon="btn.icon">
              <span v-html="btn._text"></span>
            </a-button>
          </a-popconfirm>
          <a-button
            v-else
            :type="btn.buttonType"
            :icon="btn.icon"
            @click="operateClick(btn)"
            ><span v-html="btn._text"></span
          ></a-button>
        </template>
      </template>
    </a-button-group>
  </template>
  <template v-else>
    <span v-for="btn in operates$" :key="btn.text" class="mr-md btn">
      <a-dropdown v-if="btn._children.length > 0">
        <span>
          <a> <span v-html="btn._text"></span> <DownOutlined /> </a>
        </span>
        <template #dropdown>
          <a-menu>
            <a-menu-item
              v-for="subBtn in btn._children"
              :key="subBtn._text"
              @click="operateClick(subBtn)"
            >
              <span v-html="subBtn._text"></span>
              <i :class="subBtn.icon"></i>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <template v-else>
        <a-popconfirm
          v-if="btn.type === 'popconfirm'"
          :title="btn.popconfirm.title"
          @confirm="btn.popconfirm.confirm(record)"
        >
          <a>
            <span v-html="btn._text"></span>
            <component :is="btn.icon" />
          </a>
        </a-popconfirm>
        <a v-else @click="operateClick(btn)">
          <span v-html="btn._text"></span>
          <i :class="btn.icon"></i>
        </a>
      </template>
    </span>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { IOperate, OperateType } from "./type";
import DownOutlined from "@ant-design/icons-vue/DownOutlined";
import { ArrayService } from "@blazes/utils";
import { array, object, oneOf } from "vue-types";

export default defineComponent({
  name: "operates",
  components: {
    DownOutlined,
  },
  props: {
    operates: array<IOperate>().isRequired,
    record: object(),
    type: oneOf([OperateType.Text, OperateType.Button]).def(OperateType.Button),
  },
  setup(props) {
    const validOperates = (operates: IOperate[], item: any) => {
      return operates.filter((operate) => {
        const result = operate.iif ? operate.iif(props.record) : true;
        const isRenderDisabled = operate.iifBehavior === "disabled";
        operate._result = result;
        operate._disabled = !result && isRenderDisabled;
        operate._children = ArrayService.arrIsEmpty(operate.children)
          ? []
          : validOperates(operate.children!, item);
        operate._text =
          typeof operate.text === "function"
            ? operate.text(item, operate)
            : operate.text || "";
        operate.buttonType = operate.buttonType || "default";
        return result || isRenderDisabled;
      });
    };

    const operates$ = computed(() => {
      return validOperates((props.operates as IOperate[]) || [], props.record);
    });

    const operateClick = (btn: IOperate) => {
      if (!btn.click) {
        return;
      }
      btn.click(props.record);
    };

    return { operates$, operateClick, OperateType };
  },
});
</script>
