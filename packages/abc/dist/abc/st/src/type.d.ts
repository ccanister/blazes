import { UnwrapRef } from "vue";
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
    _menus?: {
        value: ISTColumnFilterMenu[];
    };
    indeterminate?: UnwrapRef<{
        value: boolean;
    }>;
    checkAll?: UnwrapRef<{
        value: boolean;
    }>;
    _visible?: UnwrapRef<{
        value: boolean;
    }>;
}
export interface ISTColumn {
    title?: string;
    renderTitle?: string | ((column: ISTColumn, index: number) => void);
    index?: string | string[] | null | undefined;
    render?: string;
    default?: string;
    width?: string;
    format?: (data: ISTData, column: ISTColumn, index: number, realIndex: number) => string;
    iif?: (column: ISTColumn) => boolean;
    noIndex?: number;
    indexKey?: string;
    fixed?: "left" | "right";
    buttons?: ISTColumnButton[];
    type?: "tag" | "ellipsis" | "link";
    tag?: ISTColumnTag;
    filter?: ISTColumnFilter | null;
    click?: (data: ISTData) => any;
    customRender?: (params: {
        text: string;
        record: ISTData;
        index: number;
    }) => Record<string, any>;
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
    reName?: ISTResReNameType;
    process?: (data: ISTData[], rawData?: any) => ISTData[];
}
export interface ISTPage {
    front?: boolean;
    position?: "top" | "bottom" | "both";
    show?: boolean;
    showSize?: boolean;
    pageSizes?: number[];
    showQuickJumper?: boolean;
    indexReset?: boolean;
    toTop?: boolean;
    toTopOffset?: number;
}
export interface ISTReq {
    params?: any;
    headers?: any;
    reName?: ISTReqReNameType;
    firstParams?: any;
}
export interface ISTDataSourceOption {
    pi: number;
    ps: number;
    paginator: boolean;
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
    children?: ISTColumnButton[];
    iif?: (record: ISTData, column: ISTColumn) => boolean;
    iifBehavior?: "hide" | "disabled";
    type?: "popconfirm";
    popconfirm?: {
        title: string;
        confirm: (record: ISTData) => void;
    };
    [key: string]: any;
}
export interface ISTResetColumnsOption {
    pi?: number;
    ps?: number;
    columns?: ISTColumn[];
    preClearData?: boolean;
    emitReload?: boolean;
}
export interface ISTLoadOptions {
    merge: boolean;
}
export declare const COLUMN_DEFAULT = "-";
export declare const NO_INDEX = 1;
export declare const DEFAULT_ST_RES: ISTRes;
export declare const DEFAULT_ST_REQ: ISTReq;
export declare const DEFAULT_ST_PAGE: ISTPage;
export declare const DEFAULT_IIF_BEHAIVOR = "hide";
export declare const DEFAULT_FILTER: {
    filterConfirmText: string;
    filterClearText: string;
};
