<template>
  <div>
    <a-form :model="form" ref="formRef">
      <a-form-item
        v-for="item in items"
        :key="item.ui.prop"
        :label="item.title"
        :name="item.ui.prop"
        :rules="item.ui.rules"
        :class="item.class"
        :style="{ width: item.ui.gutter.controlWidth }"
        :wrapperCol="{
          span: item.ui.gutter.spanControl,
          offset: item.ui.gutter.controlffset,
        }"
        :labelCol="{
          span: item.ui.gutter.spanLabel,
          offset: item.ui.gutter.spanOffset,
        }"
      >
        <component
          :ui="item.ui"
          :schema="item"
          v-model="form[item.ui.prop]"
          :is="item.ui.widget"
          :ref="addItem(item.ui.prop)"
        ></component>
      </a-form-item>
    </a-form>
    <div v-if="button$" :class="button$.className">
      <a-row type="flex" :justify="button$.span ? 'start' : 'end'">
        <a-col class="text-right" :span="button$.span">
          <a-button v-if="!button$.hideReset" @click="reset" class="mr-md">{{
            button$.resetText || "取消"
          }}</a-button>
          <a-button
            type="primary"
            @click="submit"
            v-if="!button$.hideSubmit"
            v-btn-loading
            >{{ button$.submitText || "确定" }}</a-button
          >
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts">
import {
  ISFSchema,
  formSymbol,
  formRefSymbol,
  DEFAULT_GUTTER,
  ISFSchemaType,
} from "./type";
import { Form, Row, Col, Button } from "ant-design-vue";
import {
  computed,
  defineComponent,
  provide,
  reactive,
  ref,
  Ref,
  watch,
} from "vue";
import SfInput from "./widgets/sf-input.vue";
import { CUSTOM_TRIGGER } from "@blazes/theme";
import StringModel from "./model/string";
import AnyModel from "./model/any";
import NumberModel from "./model/number";
import BoolModel from "./model/boolean";
import BaseModel from "./model/base";
import { BtnLoading } from "@blazes/theme";

const typeModels = {
  string: StringModel,
  regexp: StringModel,
  any: AnyModel,
  number: NumberModel,
  boolean: BoolModel,
};

export default defineComponent({
  name: "sf",
  props: {
    schema: Object,
    width: String,
    button: Object,
    formData: Object,
  },
  emits: {
    formSubmit: null,
    formReset: null,
  },
  components: {
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
  },
  directives: {
    btnLoading: new BtnLoading(),
  },
  setup(props, context) {
    const formRef: Ref<typeof Form | null> = ref(null);
    const items: any[] = [];
    const form: { [key: string]: BaseModel<any> } = reactive({
      ...(props.formData || {}),
    });
    provide(formSymbol, form);
    provide(formRefSymbol, formRef);
    const addReuiqredRule = (item: ISFSchema, type: ISFSchemaType) => {
      return {
        required: true,
        fullField: item.title,
        trigger: CUSTOM_TRIGGER,
        type,
        transform: (value: any) => new typeModels[type]().getValue(value),
      };
    };
    let itemProperties: { [key: string]: any } = {};

    // TODO el不知道怎么从模板中传入
    const addItem = (prop: string) => (el: any) => {
      itemProperties[prop] = el;
    };

    const searchProperty = (property: string) => {
      return itemProperties[property];
    };

    watch(
      () => props.schema as ISFSchema,
      (schema) => {
        itemProperties = {};
        const parentGutter = {
          ...DEFAULT_GUTTER,
          ...(schema?.ui?.gutter || {}),
        };
        const properties = schema.properties as { [key: string]: ISFSchema };
        Object.keys(properties).forEach((key: string) => {
          const item: ISFSchema = { ...properties[key] };
          item.ui = { ...(item.ui || {}) };
          item.ui.widget = item.ui.widget || SfInput;
          item.ui.placeholder = item.ui.placeholder || `请填写${item.title}`;
          item.ui.prop = key;
          item.ui.rules =
            item.ui.rules == null
              ? []
              : Array.isArray(item.ui.rules)
              ? item.ui.rules
              : [item.ui.rules];
          const type = (item.type = item.type || "string");
          if (item.required) {
            const requiredRule = item.ui.rules.find(
              (r: any) => r.ruquired === true
            );
            if (!requiredRule) {
              item.ui.rules.push(addReuiqredRule(item, type));
            }
          }
          if (item.ui.validate) {
            item.ui.rules.push({
              ...item.ui.validate,
              validator: item.ui.validate.validator(form),
            });
          }
          if (!item.ui.hidden) {
            items.push(item);
          }
          item.ui.gutter = { ...parentGutter, ...(item.ui.gutter || {}) };
        });
      },
      { immediate: true }
    );

    const button$ = computed(() => {
      if (props.button === null) {
        return null;
      }
      return props.button || {};
    });

    const submit = () => {
      (formRef.value as any).validate().then(() => {
        context.emit("formSubmit", form);
      });
    };
    const reset = () => {
      context.emit("formReset", form);
    };

    return {
      items,
      formRef,
      form,
      submit,
      reset,
      button$,
      searchProperty,
      addItem,
    };
  },
});
</script>
<style lang="less" scoped>
.icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -24px;
  color: #57b425;
  font-size: 20px;
}
</style>
