import { deepGet } from "@blazes/utils";

export interface ISvOption<T> {
  label: string | ((data: T) => any);
  value?: string | ((data: T) => any);
  col?: number;
  renderValue?: string;
  class?: string;
}

export class SvOption<T> {
  label: string;
  value: any;
  col = 0;
  [key: string]: any;
  renderValue?: string;
  class: string[];

  constructor(option: ISvOption<T>, data: T, defaultVal = "") {
    const { label, value, renderValue } = option;
    this.label = typeof label === "string" ? label : label(data);
    this.renderValue = renderValue;
    const result =
      typeof value === "string"
        ? deepGet(data, value)
        : value
        ? value(data)
        : null;
    this.value = result == null ? defaultVal : result;
    this.class = option.class ? [option.class] : [];
  }
}

export interface ISv<T> {
  defaultVal?: any;
  options: ISvOption<T>[];
  labelWidth?: number;
  gutter?: number;
  col?: number;
}

export class Sv<T> {
  defaultVal: any;
  options: SvOption<T>[];
  labelWidth: string;
  gutter: number;
  col: number;

  constructor(sv: ISv<T>, data: T) {
    const { defaultVal, options, gutter, labelWidth, col } = sv;
    this.defaultVal = defaultVal || "-";
    this.gutter = gutter || 32;
    this.labelWidth = labelWidth ? labelWidth + "px" : "";
    this.col = col || 3;
    this.options = options.map((ioption) => {
      const option = new SvOption(ioption, data, this.defaultVal);
      option.col = ioption.col || this.col;
      return option;
    });
  }
}
