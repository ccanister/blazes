export interface IOperate<T = any> {
    text?: string | ((record: T, btn: IOperate<T>) => string);
    icon?: string;
    click?: (record: T) => void | "reload";
    children?: IOperate<T>[];
    iif?: (record: T) => boolean;
    iifBehavior?: "hide" | "disabled";
    type?: "primary" | "default";
    [key: string]: any;
}
