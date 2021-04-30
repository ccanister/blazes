import { Ref } from "vue";
declare const _default: import("vue").DefineComponent<{
    text: StringConstructor;
    toolTip: StringConstructor;
    popperClass: {
        type: StringConstructor;
        default: string;
    };
}, {
    mode: Ref<string>;
    relTooltip: string | undefined;
    wrapperRef: Ref<HTMLDivElement | null>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    popperClass: string;
} & {
    text?: string | undefined;
    toolTip?: string | undefined;
}>, {
    popperClass: string;
}>;
export default _default;
