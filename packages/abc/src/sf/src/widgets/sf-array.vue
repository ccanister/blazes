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
          <template v-if="ui.arrayIsSingle">
            <a-col :span="ui.$items.gutter.span">
              <sf-item
                :ui="ui.$items"
                :schema="schema.items"
                :property="formData"
              >
                <component
                  :ui="ui.$items"
                  :schema="schema.items"
                  :property="formData"
                  :is="ui.$items.widget"
                  :ref="property.addWidget(formData.path)"
                ></component>
              </sf-item>
            </a-col>
          </template>
          <template v-else>
            <sf-object
              :property="formData"
              :schema="ui.$items"
              :ui="ui"
              :ref="property.addWidget(formData.path)"
            />
          </template>
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
import { defineComponent, toRef } from "vue";
import { object } from "vue-types";
import { ArrayProperty } from "../model/array.property";
import type {
  ISFSchema,
  ISFUISchemaItem,
  SFValue,
} from "@blazes/abc/lib/sf/src/type";
import DeleteOutlined from "@ant-design/icons-vue/DeleteOutlined";
import SfItem from "./sf-item.vue";
import SfObject from "./sf-object.vue";

export default defineComponent({
  name: "sf-array",
  components: {
    DeleteOutlined,
    SfItem,
    SfObject,
  },
  props: {
    property: object<ArrayProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
    schema: object<ISFSchema>().isRequired,
  },
  setup(props) {
    const property = toRef(props, "property");

    const add = () => {
      if (props.ui.arrayIsSingle) {
        property.value.add(props.schema.default);
      } else {
        property.value.add({});
      }
    };
    const del = (index: number) => {
      property.value.remove(index);
    };
    const reset = (value: SFValue) => {
      property.value.properties = [];
      (value || []).forEach((v: SFValue) => {
        property.value.add(v);
      });
    };

    return { add, del, reset };
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
