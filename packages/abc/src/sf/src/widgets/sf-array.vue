<template>
  <div class="sf-array-wrapper">
    <div class="sf-array-main">
      <div
        v-for="(formData, index) in property.properties"
        :key="formData"
        class="sf-array-item"
        :style="{
          width: ui.gutter.arraySpan
            ? (ui.gutter.arraySpan / 24) * 100 + '%'
            : '33%',
        }"
      >
        <a-row class="sf-array-item-wrapper">
          <a-col v-for="item in ui.$items" :key="item" :span="item.gutter.span">
            <a-form-item
              :name="item.prop"
              :rules="item.rules"
              :class="item.class"
              :style="{ width: item.gutter.controlWidth }"
              :wrapperCol="{
                span: item.gutter.spanControl,
                offset: item.gutter.controlOffset,
              }"
              :labelCol="{
                span: item.gutter.spanLabel,
                offset: item.gutter.spanOffset,
              }"
              :labelAlign="item.labelAlign"
              :colon="!item.noColon"
              :extra="item.description"
            >
              <template #label>
                <slot
                  v-if="$slots[item.prop]"
                  :name="item.prop"
                  :schema="schema.items.properties[item.prop]"
                ></slot>
                <template v-else>
                  <span class="title">
                    {{ schema.items.properties[item.prop].title }}
                    <a-tooltip v-if="item.optionalHelp">
                      <template #title>{{ item.optionalHelp }} </template>
                      <QuestionCircleOutlined class="help" />
                    </a-tooltip>
                  </span>
                </template>
              </template>
              <component
                :ui="item"
                :schema="schema.items.properties[item.prop]"
                :property="formData.properties[item.prop]"
                :is="item.widget"
              ></component>
            </a-form-item>
          </a-col>
        </a-row>
        <div class="sf-array-item-del" @click="del(index)">
          <DeleteOutlined />
        </div>
      </div>
    </div>
    <a-button type="dashed" @click="add"> 新增 </a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw } from "vue";
import { object } from "vue-types";
import { ArrayProperty } from "../model/array.property";
import { ISFSchema, ISFUISchemaItem } from "@blazes/abc/lib/sf/src/type";
import DeleteOutlined from "@ant-design/icons-vue/DeleteOutlined";
import QuestionCircleOutlined from "@ant-design/icons-vue/QuestionCircleOutlined";

export default defineComponent({
  name: "sf-array",
  components: {
    DeleteOutlined,
    QuestionCircleOutlined,
  },
  props: {
    property: object<ArrayProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFSchema>().isRequired,
  },
  setup(props) {
    console.log(props.ui);
    const property = toRaw(props.property);
    const add = () => {
      property.add({});
    };
    const del = (index: number) => {
      property.remove(index);
    };

    return { add, del };
  },
});
</script>

<style scoped lang="less">
.sf-array-wrapper {
  .sf-array-main {
    display: flex;
    flex-wrap: wrap;
    .sf-array-item {
      position: relative;
      .sf-array-item-wrapper {
        box-sizing: content-box;
        margin: 0 16px 16px 0;
        padding: 12px 12px 0;
        border: 1px solid #f0f0f0;
      }
      &:hover {
        .sf-array-item-del {
          display: initial;
        }
      }
      .sf-array-item-del {
        display: none;
        position: absolute;
        top: -16px;
        right: 0px;
        width: 32px;
        height: 32px;
        font-size: 20px;
        line-height: 32px;
        text-align: center;
        background: #00000042;
        border-radius: 50%;
        cursor: pointer;
        span {
          color: #fff;
        }
      }
    }
  }
}
</style>
