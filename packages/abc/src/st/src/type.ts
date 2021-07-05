export interface ISTData {
  checked?: boolean;
  disabled?: boolean;
  expand?: boolean;
  showExpand?: boolean;
  [key: string]: any;
}

export interface ISTColumnTagValue {
  color: string;
  text: string;
}

export interface ISTColumnTag {
  [key: number]: ISTColumnTagValue;
  [key: string]: ISTColumnTagValue;
}

export interface ISTColumnFilterMenu {
  text: string;
  value: any;
  checked?: boolean;
}

export interface ISTColumnFilter {
  menus: ISTColumnFilterMenu[] | (() => Promise<ISTColumnFilterMenu[]>);
  confirmText?: string;
  clearText?: string;
  key?: string;
  reName?: (list: ISTColumnFilterMenu[], col: ISTColumn) => Record<string, any>;
  _default?: any;
  _menus?: { value: ISTColumnFilterMenu[] };
  indeterminate?: { value: boolean };
  checkAll?: { value: boolean };
  _visible?: { value: boolean };
  fn?: (filter: ISTColumnFilterMenu, record: ISTData) => boolean; // 本地筛选函数
}

export interface ISTColumn {
  title?: string;
  renderTitle?: string | ((column: ISTColumn, index: number) => void);
  index?: string | string[] | null | undefined;
  render?: string;
  default?: string;
  width?: string;
  format?: (
    data: ISTData,
    column: ISTColumn,
    index: number,
    realIndex: number
  ) => string;
  iif?: (column: ISTColumn) => boolean;
  noIndex?: number;
  indexKey?: string;
  fixed?: "left" | "right"; // 用来固定列
  buttons?: ISTColumnButton[];
  type?: "tag" | "link";
  tag?: ISTColumnTag;
  filter?: ISTColumnFilter | null;
  click?: (data: ISTData) => any;
  customRender?: (params: {
    text: string;
    record: ISTData;
    index: number;
  }) => Record<string, any>;
  sorter?: (o1: ISTData, o2: ISTData) => number;
  sortOrder?: "descend" | "ascend";
  ellipsis?: boolean;
  [key: string]: any;
}

export interface ISTReqReNameType {
  pi?: string;
  ps?: string;
}

export interface ISTResReNameType {
  total?: string;
  list?: string;
}

export interface ISTRes {
  reName?: ISTResReNameType; // 重命名total和list
  process?: (data: ISTData[], rawData?: any) => ISTData[]; // rawData全部原始数据
}

export interface ISTPage {
  front?: boolean; //  前端分页
  position?: "top" | "bottom" | "both";
  show?: boolean;
  showSize?: boolean;
  pageSizes?: string[];
  showQuickJumper?: boolean;
  indexReset?: boolean;
  toTop?: boolean; // 滚动到顶部
  toTopOffset?: number; // 滚动的偏移距离
}

export interface ISTReq {
  params?: any; // 除了pi和ps附加到req
  headers?: any;
  reName?: ISTReqReNameType; // 重命名pi和ps
  firstParams?: any; // 只在第一次传入的参数
}

export interface ISTDataSourceOption {
  pi: number;
  ps: number;
  paginator: boolean; // 后端查询是否分页
  data: string | Promise<ISTData[]> | ISTData[];
  total: number;
  columns: ISTColumn[];
  req: ISTReq;
  res: ISTRes;
  page: ISTPage;
  first: boolean;
}

export interface ISTDataSourceResult {
  /** 是否需要显示分页器 */
  pageShow: boolean;
  /** 新 `pi`，若返回 `undefined` 表示用户受控 */
  pi: number;
  /** 新 `ps`，若返回 `undefined` 表示用户受控 */
  ps: number;
  /** 新 `total`，若返回 `undefined` 表示用户受控 */
  total: number;
  list: ISTData[];
}

export interface ISTColumnButton {
  text?: string | ((record: ISTData, btn: ISTColumnButton) => string);
  icon?: string;
  click?: (record: ISTData) => void | "reload";
  children?: ISTColumnButton[]; // 更多的下拉菜单
  iif?: (record: ISTData, column: ISTColumn) => boolean;
  iifBehavior?: "hide" | "disabled"; // iif返回false时候的表现
  type?: "popconfirm";
  popconfirm?: ISTColumnPopConfirm;
  [key: string]: any;
}

export interface ISTColumnPopConfirm {
  title: string;
  confirm: (record: ISTData) => void;
}

export interface ISTResetColumnsOption {
  pi?: number;
  ps?: number;
  columns?: ISTColumn[];
  preClearData?: boolean;
  emitReload?: boolean;
}

export interface ISTLoadOptions {
  merge: boolean; //是否合并
}

export interface ISTChange {
  type: "filter";
  column: ISTColumn;
  menus?: ISTColumnFilterMenu[];
}

export const COLUMN_DEFAULT = "-";
export const NO_INDEX = 1;

export const DEFAULT_ST_RES: ISTRes = {
  reName: { total: "total", list: "items" },
};
export const DEFAULT_ST_REQ: ISTReq = {
  reName: { pi: "offset", ps: "limit" },
};
export const DEFAULT_ST_PAGE: ISTPage = {
  front: true,
  position: "bottom",
  show: true,
  showSize: false,
  pageSizes: ["10", "20", "30", "40", "50"],
  showQuickJumper: false,
  indexReset: true,
  toTop: true,
  toTopOffset: 100,
};
export const DEFAULT_IIF_BEHAIVOR = "hide";
export const DEFAULT_FILTER = {
  filterConfirmText: "确定",
  filterClearText: "重置",
};
