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
  optionalHelp?: string;
  widget?: any;
  rules?: any;
  prop?: string;
  validate?: {
    validator: (form: any) => void;
    trigger: "blur" | "change" | typeof CUSTOM_TRIGGER;
  };
  asyncData?: () => Promise<ISFSchemaEnumType[]>;
  gutter?: ISFUISchemaItemGutter;
  hidden?: boolean;
  layout?: "horizontal" | "vertical";
  visibleIf?: { [key: string]: any[] | ((value: any) => boolean) };
  noColon?: boolean;
  labelAlign?: "left" | "right";
  [key: string]: any;
}

export interface ISFUISchemaItemGutter {
  spanOffset?: number;
  controlOffset?: number;
  controlWidth?: string;
  spanLabel?: number;
  spanControl?: number;
  span?: number;
  arraySpan?: number;
}

export type ISFSchemaType =
  | "string"
  | "number"
  | "boolean"
  | "any"
  | "object"
  | "array";

// 默认object先
export interface ISFSchema {
  title?: string;
  required?: boolean;
  description?: string;
  type?: ISFSchemaType;
  enums?: ISFSchemaEnumType[];
  ui?: ISFUISchemaItem;
  readOnly?: boolean;
  default?: any; // 默认值
  maxlength?: number;
  minimum?: number;
  maximum?: number;
  multipleOf?: number;
  properties?: { [key: string]: ISFSchema };
  items?: ISFSchema;
}

export interface ISFSchemaButton {
  className?: string; // 默认text-right
  submitText?: string;
  resetText?: string;
  span?: number;
  hideSubmit?: boolean;
  hideReset?: boolean;
}

export const formSymbol = "sfform";
export const formRefSymbol = "sfformRef";

export const DEFAULT_GUTTER = {
  offset: 0,
  controlWidth: "auto",
  spanLabel: 5,
  spanControl: 17,
  span: 24,
};

export type SFValue = any;

export interface ISFFormValueChange {
  path: string | null;
  pathValue: SFValue;
  value: SFValue;
}

export interface ISFUpdateValueAndValidity {
  updatePath?: string;
  updateValue?: SFValue | null;
  onlySelf?: boolean;
}

export const SF_SEQ = "/";

export const DEFAULT_BUTTON: ISFSchemaButton = {
  submitText: "确定",
  resetText: "取消",
  hideSubmit: false,
  hideReset: false,
};
