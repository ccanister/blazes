import { IOperate } from "./type";
declare const _default: import("vue").DefineComponent<{
    operates: ArrayConstructor;
    record: ObjectConstructor;
    type: {
        type: StringConstructor;
        default: string;
    };
    firstButtonPrimary: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    operates$: import("vue").ComputedRef<IOperate<any>[]>;
    operateClick: (btn: IOperate) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    type: string;
    firstButtonPrimary: boolean;
} & {
    operates?: unknown[] | undefined;
    record?: Record<string, any> | undefined;
}>, {
    type: string;
    firstButtonPrimary: boolean;
}>;
export default _default;
