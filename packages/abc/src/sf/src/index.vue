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
          <template v-if="item._visibilityChanges && !item.hidden">
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
                :schema="item.schema"
                :property="item"
                :is="item.ui.widget"
                :ref="addItem(item.ui.prop)"
              ></component>
            </a-form-item>
            <template v-if="$slots.item">
              <slot
                name="item"
                :item="item"
                :prop="item.ui.prop"
                :index="index"
              ></slot>
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
  ISFFormValueChange,
  ISFUISchemaItem,
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
  ref,
  Ref,
  toRaw,
  watch,
  WatchStopHandle,
} from "vue";
import SfDefault from "./widgets/sf-default.vue";
import { CUSTOM_TRIGGER } from "@blazes/theme";
import { BtnLoading } from "@blazes/theme";
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
    const form: Ref<Record<string, unknown>> = ref({});
    provide(formSymbol, form);
    provide(formRefSymbol, formRef);
    const addReuiqredRule = (item: ISFSchema, type: ISFSchemaType) => {
      return {
        required: true,
        fullField: item.title,
        trigger: CUSTOM_TRIGGER,
        type,
      };
    };

    const addItem = (prop: string) => (widget: any) => {
      // 卸载时候会调用该方法
      if (widget == null) {
        return;
      }
      const formProperty = rootProperty.value!.searchProperty(`/${prop}`)!;
      formProperty.widget = widget;
    };

    const searchProperty = (property: string) => {
      return rootProperty.value!.searchProperty(property);
    };

    const fixSchema = (schema: ISFSchema) => {
      schema.ui = Object.assign({}, schema.ui);
      schema.ui!.gutter = Object.assign({}, DEFAULT_GUTTER, schema.ui!.gutter);

      const inFn = (
        parentSchema: ISFSchema,
        parentUI: ISFUISchemaItem,
        uiRes: ISFUISchemaItem
      ) => {
        parentSchema.type = "object";
        const properties = parentSchema.properties!;
        Object.keys(properties).forEach((key: string) => {
          const item = properties[key];
          const ui = (item.ui = { ...(item.ui || {}) });
          ui.widget = markRaw(toRaw(ui.widget || SfDefault));
          ui.placeholder = ui.placeholder || `请填写${item.title}`;
          ui.prop = key;
          ui.rules =
            ui.rules == null
              ? []
              : Array.isArray(ui.rules)
              ? ui.rules
              : [ui.rules];
          const type = (item.type = item.type || "any");
          if (item.required) {
            const requiredRule = ui.rules.find((r: any) => r.required === true);
            if (!requiredRule) {
              ui.rules.push(addReuiqredRule(item, type));
            }
          }
          if (ui.validate) {
            ui.rules.push({
              ...ui.validate,
              validator: ui.validate.validator(form),
            });
          }
          ui.gutter = { ...parentUI.gutter, ...(ui.gutter || {}) };
          uiRes[`$${key}`] = ui;
          if (item.items) {
            ui["$items"] = {};
            const itemsUI = {
              ...item.items.ui,
              gutter: { ...ui.gutter, ...item.items.ui?.gutter },
            };
            inFn(item.items, itemsUI, ui["$items"]);
          }
        });
        return properties;
      };
      inFn(schema, schema.ui, schema.ui);
    };

    let formChangeWatch: WatchStopHandle;
    const watchFormChange = () => {
      formChangeWatch && formChangeWatch();
      let first = true;
      formChangeWatch = watch(
        () =>
          (rootProperty.value!._valueChanges as unknown) as ISFFormValueChange,
        (valueChange) => {
          if (first) {
            first = false;
            return;
          }
          form.value = valueChange.value;
          context.emit("formChange", valueChange);
        },
        { immediate: true }
      );
    };

    const refreshSchema = (schema: ISFSchema) => {
      fixSchema(schema);
      const property = (rootProperty.value = formPropertyFactory.createProperty(
        schema,
        schema.ui!,
        props.formData || {}
      ));
      watchFormChange();
      property.resetValue(props.formData, false);
    };

    watch(
      () => props.schema as ISFSchema,
      (schema) => {
        refreshSchema(schema);
      },
      { immediate: true }
    );

    watch(
      () => props.formData as any,
      (data) => {
        if (!data) {
          return;
        }
        Object.keys(data).forEach((prop) => {
          const formProperty = rootProperty.value!.searchProperty(`/${prop}`)!;
          if (!formProperty) {
            return;
          }
          formProperty.widget!.reset(data[prop]);
        });
      }
    );

    const button$ = computed(() =>
      props.button === null
        ? null
        : Object.assign({}, props.button, DEFAULT_BUTTON)
    );

    const submit = () => {
      (formRef.value as any).validate().then(() => {
        context.emit("formSubmit", form.value);
      });
    };
    const reset = () => {
      context.emit("formReset", form.value);
    };

    return {
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
