<template>
  <div class="sf-wrapper">
    <a-form
      :model="form"
      ref="formRef"
      :layout="schema?.ui?.layout || 'horizontal'"
      :labelAlign="schema?.ui?.labelAlign"
      :colon="!schema?.ui?.noColon"
    >
      <a-row>
        <a-col
          v-for="(item, key, index) in rootProperty.properties"
          :key="item"
          :span="item.ui.gutter.span"
        >
          <template v-if="item.visible || !item.hidden">
            <a-form-item
              :name="item.ui.prop"
              :rules="item.ui.rules"
              :class="item.ui.class"
              :style="{ width: item.ui.gutter.controlWidth }"
              :wrapperCol="{
                span: item.ui.gutter.spanControl,
                offset: item.ui.gutter.controlOffset,
              }"
              :labelCol="{
                span: item.ui.gutter.spanLabel,
                offset: item.ui.gutter.spanOffset,
              }"
              :labelAlign="item.ui.labelAlign"
              :colon="!schema?.ui?.noColon"
              :extra="item.description"
            >
              <template #label>
                <slot
                  v-if="$slots[item.ui.prop]"
                  :name="item.ui.prop"
                  :schema="item"
                ></slot>
                <template v-else>
                  <span class="title">
                    {{ item.schema.title }}
                    <a-tooltip v-if="item.ui.optionalHelp">
                      <template #title>{{ item.ui.optionalHelp }} </template>
                      <QuestionCircleOutlined class="help" />
                    </a-tooltip>
                  </span>
                </template>
              </template>
              <component
                :ui="item.ui"
                :schema="item"
                :property="item"
                :is="item.ui.widget"
                :ref="addItem(item.ui.prop)"
              ></component>
            </a-form-item>
            <template v-if="$slots.item">
              <slot name="item" :schema="item" :index="index"></slot>
            </template>
          </template>
        </a-col>
      </a-row>
    </a-form>
    <div v-if="button$" :class="button$.className">
      <a-row type="flex" :justify="button$.span ? 'start' : 'end'">
        <a-col :span="button$.span">
          <a-button v-if="!button$.hideReset" @click="reset" class="mr-md">
            {{ button$.resetText }}
          </a-button>
          <a-button
            type="primary"
            @click="submit"
            v-if="!button$.hideSubmit"
            v-btn-loading
          >
            {{ button$.submitText }}
          </a-button>
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
  ISFSchemaButton,
  DEFAULT_BUTTON,
} from "./type";
import Form from "ant-design-vue/lib/form";
import Row from "ant-design-vue/lib/row";
import Col from "ant-design-vue/lib/col";
import Button from "ant-design-vue/lib/button";
import {
  computed,
  defineComponent,
  markRaw,
  provide,
  reactive,
  ref,
  Ref,
  shallowReactive,
  toRaw,
  toRef,
  watch,
} from "vue";
import SfDefault from "./widgets/sf-default.vue";
import { CUSTOM_TRIGGER } from "@blazes/theme";
import { typeModels } from "./model/context";
import { BtnLoading } from "@blazes/theme";
import { ArrayService } from "@blazes/utils/dist";
import QuestionCircleOutlined from "@ant-design/icons-vue/QuestionCircleOutlined";
import { object } from "vue-types";
import { FormPropertyFactory } from "./model/form.property.factory";
import { FormProperty } from "./model/form.property";

export default defineComponent({
  name: "sf",
  props: {
    schema: object<ISFSchema>().isRequired,
    button: object<ISFSchemaButton>(),
    formData: object(),
  },
  emits: {
    formSubmit: null,
    formReset: null,
    formChange: null,
  },
  components: {
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    QuestionCircleOutlined,
  },
  directives: {
    btnLoading: new BtnLoading(),
  },
  setup(props, context) {
    const formPropertyFactory = new FormPropertyFactory();
    const rootProperty: Ref<FormProperty | null> = ref(null);
    const formRef: Ref<typeof Form | null> = ref(null);
    const items: any[] = reactive([]);
    const form: { [key: string]: any } = reactive({
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

    const fixSchema = (schema: ISFSchema) => {
      schema.type = "object";
      const properties = schema.properties!;
      const parentGutter = Object.assign({}, DEFAULT_GUTTER, schema.ui?.gutter);
      Object.keys(properties).forEach((key: string) => {
        const item = properties[key];
        item.ui = shallowReactive({ ...(item.ui || {}) });
        item.ui.widget = markRaw(toRaw(item.ui.widget || SfDefault));
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
            (r: any) => r.required === true
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
        schema.ui![`$${key}`] = item.ui;
      });
    };

    const watchFormChange = () => {
      let preForm = { ...form };
      watch(form, (value) => {
        let path = "";
        Object.keys(preForm).forEach((key) => {
          if (value[key] !== preForm[key]) {
            path = key;
          }
        });
        preForm = { ...form };
        context.emit("formChange", { value, path, pathValue: value[path] });
      });
    };

    const refreshSchema = (schema: ISFSchema) => {
      fixSchema(schema);
      const property = (rootProperty.value = formPropertyFactory.createProperty(
        schema,
        schema.ui!,
        props.formData || {}
      ));
      property.resetValue();
    };

    watch(
      () => props.schema as ISFSchema,
      (schema) => {
        refreshSchema(schema);
      },
      { immediate: true }
    );
    //     ArrayService.clear(items);
    //     itemProperties = {};
    //     const parentGutter = {
    //       ...DEFAULT_GUTTER,
    //       ...(schema?.ui?.gutter || {}),
    //     };
    //     const properties = schema.properties as { [key: string]: ISFSchema };
    //     Object.keys(properties).forEach((key: string) => {
    //       const item: ISFSchema = { ...properties[key] };
    //       form[key] =
    //         item.default != null
    //           ? item.default
    //           : form[key] != null
    //           ? form[key]
    //           : null;
    //       item.ui = shallowReactive({ ...(item.ui || {}) });
    //       item.ui.widget = markRaw(toRaw(item.ui.widget || SfDefault));
    //       item.ui.placeholder = item.ui.placeholder || `请填写${item.title}`;
    //       item.ui.prop = key;
    //       item.ui.rules =
    //         item.ui.rules == null
    //           ? []
    //           : Array.isArray(item.ui.rules)
    //           ? item.ui.rules
    //           : [item.ui.rules];
    //       const type = (item.type = item.type || "string");
    //       if (item.required) {
    //         const requiredRule = item.ui.rules.find(
    //           (r: any) => r.required === true
    //         );
    //         if (!requiredRule) {
    //           item.ui.rules.push(addReuiqredRule(item, type));
    //         }
    //       }
    //       if (item.ui.validate) {
    //         item.ui.rules.push({
    //           ...item.ui.validate,
    //           validator: item.ui.validate.validator(form),
    //         });
    //       }
    //       if (!item.ui.hidden) {
    //         items.push(item);
    //       }
    //       item.ui.gutter = { ...parentGutter, ...(item.ui.gutter || {}) };
    //     });
    //   },
    //   { immediate: true }
    // );

    watch(
      () => props.formData as any,
      (data) => {
        data = data || {};
        const keySet = new Set(Object.keys(form));
        Object.keys(data).forEach((key) => {
          keySet.add(key);
        });
        Array.from(keySet).forEach((key) => {
          form[key] = data[key] !== undefined ? data[key] : form[key];
        });
      }
    );

    const button$ = computed(() =>
      Object.assign({}, props.button, DEFAULT_BUTTON)
    );

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
      rootProperty,
    };
  },
});
</script>
<style lang="less" scoped>
.sf-wrapper {
  .title {
    .help {
      cursor: pointer;
    }
  }
}
</style>
