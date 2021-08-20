import { ISFUISchemaItem, SFValue, ISFSchema } from "../type";
import { StringProperty } from "../model/string.property";
declare const _default: import("vue").DefineComponent<{
    property: import("vue-types").VueTypeValidableDef<StringProperty> & {
        required: true;
    };
    ui: import("vue-types").VueTypeValidableDef<ISFUISchemaItem> & {
        required: true;
    };
    schema: import("vue-types").VueTypeValidableDef<ISFSchema> & {
        required: true;
    };
}, {
    changeValue: () => void;
    reset: (value: SFValue) => void;
    model: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": null;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    property: StringProperty;
    ui: ISFUISchemaItem;
    schema: ISFSchema;
} & {}>, {}>;
export default _default;
