export interface ISvOption<T> {
    label: string | ((data: T) => any);
    value?: string | ((data: T) => any);
    col?: number;
    renderValue?: string;
}
export declare class SvOption<T> {
    label: string;
    value: any;
    col: number;
    [key: string]: any;
    renderValue?: string;
    constructor(option: ISvOption<T>, data: T, defaultVal?: string);
}
export interface ISv<T> {
    defaultVal?: any;
    options: ISvOption<T>[];
    labelWidth?: number;
    gutter?: number;
    col?: number;
}
export declare class Sv<T> {
    defaultVal: any;
    options: SvOption<T>[];
    labelWidth: string;
    gutter: number;
    col: number;
    constructor(sv: ISv<T>, data: T);
}
