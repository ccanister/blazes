import { CUSTOM_TRIGGER } from "@blazes/theme";
export interface ISFSchemaEnum {
    label?: string;
    value?: any;
    disabled?: boolean;
    checked?: boolean;
}
export declare type ISFSchemaEnumType = ISFSchemaEnum | number | string | boolean;
export interface ISFUISchemaItem {
    class?: string;
    placeholder?: string;
    optional?: string;
    optionalHelp?: string;
    widget?: any;
    rules?: any;
    prop?: string;
    validate?: {
        validator: (form: any) => void;
        trigger: "blur" | "change" | typeof CUSTOM_TRIGGER;
    };
    asyncData?: () => Promise<ISFSchemaEnumType[]>;
    gutter?: {
        spanOffset?: number;
        controlffset?: number;
        controlWidth?: string;
        spanLabel?: number;
        spanControl?: number;
    };
    hidden?: boolean;
    [key: string]: any;
}
export declare type ISFSchemaType = "string" | "number" | "boolean" | "regexp" | "any";
export interface ISFSchema {
    title?: string;
    required?: boolean;
    description?: string;
    type?: ISFSchemaType;
    enums?: ISFSchemaEnumType[];
    ui?: ISFUISchemaItem;
    readOnly?: boolean;
    properties?: {
        [key: string]: ISFSchema;
    };
}
export interface ISFSchemaButton {
    className?: string;
    submitText?: string;
    resetText?: string;
    span?: number;
    hideSubmit?: boolean;
    hideReset?: boolean;
}
export declare const formSymbol: unique symbol;
export declare const formRefSymbol: unique symbol;
export declare const DEFAULT_GUTTER: {
    offset: number;
    controlWidth: string;
    spanLabel: number;
    spanControl: number;
};
