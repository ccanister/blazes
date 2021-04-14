import { Ref } from "vue";
import { ISTColumn, ISTColumnButton, ISTData, ISTLoadOptions, ISTResetColumnsOption } from "./type";
declare const _default: import("vue").DefineComponent<{
    columns: ArrayConstructor;
    pageVo: ObjectConstructor;
    data: (StringConstructor | ObjectConstructor | ArrayConstructor)[];
    pi: NumberConstructor;
    ps: NumberConstructor;
    total: NumberConstructor;
    res: ObjectConstructor;
    req: ObjectConstructor;
    page: ObjectConstructor;
    rowKey: StringConstructor;
    scroll: ObjectConstructor;
}, {
    loading: Ref<boolean>;
    columns$: Ref<ISTColumn[]>;
    data$: Ref<ISTData[]>;
    isPagination: Ref<boolean>;
    total$: Ref<number>;
    pi$: Ref<number>;
    ps$: Ref<number>;
    btnText: (record: ISTData, btn: ISTColumnButton) => string;
    validBtns: (btns: ISTColumnButton[], item: ISTData, col: ISTColumn) => ISTColumnButton[];
    btnClick: (item: ISTData, btn: ISTColumnButton) => void;
    load: (pi: number, extraParams?: {} | undefined, options?: ISTLoadOptions | undefined) => void;
    reload: (extraParams?: {} | undefined, options?: ISTLoadOptions | undefined) => void;
    handleCheckAll: (event: {
        target: {
            checked: boolean;
        };
    }, col: ISTColumn, index: number) => void;
    filterConfirm: (col: ISTColumn, index: number) => void;
    setDropdownRef: Function;
    resetColumns: (options: ISTResetColumnsOption) => void;
    click: (item: ISTData, col: ISTColumn) => void;
    handleCheckPart: (col: ISTColumn, index: number) => void;
    changeTable: (event: {
        current?: number;
    }) => void;
    showTotal: (total: number) => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    columns?: unknown[] | undefined;
    pageVo?: Record<string, any> | undefined;
    data?: unknown;
    pi?: number | undefined;
    ps?: number | undefined;
    total?: number | undefined;
    res?: Record<string, any> | undefined;
    req?: Record<string, any> | undefined;
    page?: Record<string, any> | undefined;
    rowKey?: string | undefined;
    scroll?: Record<string, any> | undefined;
}>, {}>;
export default _default;
