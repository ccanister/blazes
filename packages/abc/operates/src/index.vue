<template>
  <template v-if="type === 'text'">
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
      <a v-else @click="operateClick(btn)">
        <span v-html="btn._text"></span>
        <i :class="btn.icon"></i>
      </a>
    </span>
  </template>
  <template v-else>
    <a-button-group>
      <template v-for="(btn, index) in operates$" :key="btn.text">
        <a-dropdown v-if="btn._children.length > 0">
          <a-button
            :type="firstButtonPrimary && index === 0 ? 'primary' : btn.type"
            :icon="btn.icon"
            ><span v-html="btn._text"></span
          ></a-button>
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
        <a-button
          v-else
          :type="firstButtonPrimary && index === 0 ? 'primary' : btn.type"
          :icon="btn.icon"
          @click="operateClick(btn)"
          ><span v-html="btn._text"></span
        ></a-button>
      </template>
    </a-button-group>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { IOperate } from "./type";
import { DownOutlined } from "@ant-design/icons-vue";
import { ArrayService } from "@blazes/utils";

export default defineComponent({
  name: "operates",
  components: {
    DownOutlined,
  },
  props: {
    operates: Array,
    record: Object,
    type: { type: String, default: "text" },
    firstButtonPrimary: { type: Boolean, default: true },
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
        operate.type = operate.type || "default";
        return result || isRenderDisabled;
      });
    };

    const operates$ = computed(() => {
      return props.record
        ? validOperates((props.operates as IOperate[]) || [], props.record)
        : [];
    });

    const operateClick = (btn: IOperate) => {
      if (!btn.click) {
        return;
      }
      const result = btn.click(props.record);
    };

    return { operates$, operateClick };
  },
});
</script>
