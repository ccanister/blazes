export interface IOperate<T = any> {
  text?: string | ((record: T, btn: IOperate<T>) => string);
  icon?: string;
  click?: (record: T) => void;
  children?: IOperate<T>[]; // 更多的下拉菜单
  iif?: (record: T) => boolean;
  iifBehavior?: "hide" | "disabled"; // iif返回false时候的表现
  buttonType?: "primary" | "default"; // 按钮的类型
  type?: "popconfirm";
  popconfirm?: IOperatePopConfirm<T>;
  [key: string]: any;
}

export interface IOperatePopConfirm<T> {
  title: string;
  confirm: (record: T) => void;
}
