import { CUSTOM_TRIGGER } from "@blazes/theme";

export interface ISFSchemaEnum {
  label?: string;
  value?: any;
  disabled?: boolean;
  checked?: boolean;
}

export type ISFSchemaEnumType = ISFSchemaEnum | number | string | boolean;

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
    offset?: number;
    controlWidth?: string;
    spanLabel?: number;
    spanControl?: number;
  };
  [key: string]: any;
}

// 默认object先
export interface ISFSchema {
  title?: string;
  required?: boolean;
  description?: string;
  type?: string;
  enums?: ISFSchemaEnumType[];
  ui?: ISFUISchemaItem;
  readOnly?: boolean;
  properties?: { [key: string]: ISFSchema };
}

export interface ISFSchemaButton {
  className?: string; // 默认text-right
  submitText?: string;
  resetText?: string;
  span?: number;
  hideSubmit?: boolean;
  hideReset?: boolean;
}

export const formSymbol = Symbol("form");
export const formRefSymbol = Symbol("formRef");

export const DEFAULT_GUTTER = {
  offset: 0,
  controlWidth: "auto",
  spanLabel: 5,
  spanControl: 17
};
