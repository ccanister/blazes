import {
  DEFAULT_FILTER,
  DEFAULT_IIF_BEHAIVOR,
  ISTColumn,
  ISTColumnButton,
  ISTColumnFilter,
  ISTColumnFilterMenu
} from "./type";
import { ArrayService, deepCopy } from "@blazes/utils";
import { reactive } from "vue";

export default class STColumnSource {
  lastColumns: ISTColumn[] = [];

  process(list: ISTColumn[]): ISTColumn[] {
    this.lastColumns = list;
    if (ArrayService.arrIsEmpty(list)) {
      throw new Error(`[st]: the columns property muse be define!`);
    }
    const columns: ISTColumn[] = [];
    const copyColumens = deepCopy(list) as ISTColumn[];
    for (const item of copyColumens) {
      if (item.iif && item.iif(item)) {
        continue;
      }
      if (item.index) {
        if (!Array.isArray(item.index)) {
          item.index = item.index.split(".");
        }
        item.indexKey = item.index.join(".");
      }
      item.buttons = this.fixButtons(item.buttons!);
      item.width = item.width || "auto";
      item.default = item.default || "";
      item.filter = this.filterCoerce(item);
      columns.push(item);
    }

    this.fixedCoerce(columns);

    return columns;
  }

  private filterCoerce(item: ISTColumn): ISTColumnFilter | null {
    if (item.filter == null) {
      return null;
    }
    const res: ISTColumnFilter = item.filter;
    if (!res?.menus && ArrayService.arrIsEmpty(res?.menus as ISTColumnFilterMenu[])) {
      return null;
    }

    res._menus = reactive({ value: [] });
    const menus = (Array.isArray(res.menus)
      ? () => Promise.resolve(res.menus)
      : res.menus) as () => Promise<ISTColumnFilterMenu[]>;
    menus().then((resp: ISTColumnFilterMenu[]) => {
      res._menus!.value = resp;
    });
    res.confirmText = res.confirmText || DEFAULT_FILTER.filterConfirmText;
    res.clearText = res.clearText || DEFAULT_FILTER.filterClearText;
    res.key = res.key || item.indexKey;
    res._default = reactive({ value: false });
    res.indeterminate = reactive({ value: false });
    res.checkAll = reactive({ value: false });
    res._visible = reactive({ value: false });

    return res;
  }

  private fixedCoerce(list: ISTColumn[]) {
    const countReduce = (a: number, b: ISTColumn) =>
      a + +b.width!.toString().replace("px", "");
    // left width
    list
      .filter(w => w.fixed && w.fixed === "left" && w.width)
      .forEach(
        (item, idx) =>
          (item._left = list.slice(0, idx).reduce(countReduce, 0) + "px")
      );
    // right width
    list
      .filter(w => w.fixed && w.fixed === "right" && w.width)
      .reverse()
      .forEach(
        (item, idx) =>
          (item._right =
            (idx > 0 ? list.slice(-idx).reduce(countReduce, 0) : 0) + "px")
      );
  }

  private fixButtons(list: ISTColumnButton[]) {
    if (!list) {
      return [];
    }
    const ret: ISTColumnButton[] = [];
    for (const item of list) {
      item.children = ArrayService.arrIsEmpty(item.children as any)
        ? []
        : this.fixButtons(item.children as any);
      ret.push(item);
    }
    this.btnCoerceIf(ret);

    return ret;
  }

  private btnCoerceIf(list: ISTColumnButton[]): void {
    for (const item of list) {
      if (!item.iif) item.iif = () => true;
      item.iifBehavior = item.iifBehavior || DEFAULT_IIF_BEHAIVOR;
      if (item.children && item.children.length > 0) {
        this.btnCoerceIf(item.children);
      } else {
        item.children = [];
      }
    }
  }

  cleanFilter(col: ISTColumn) {
    const f = col.filter!;
    f._menus!.value.forEach(i => (i.checked = false));
  }

  checkAllFilter(checked: boolean, col: ISTColumn) {
    const f = col.filter!;
    f._menus!.value.forEach(i => (i.checked = checked));
  }

  updateDefault(filter: ISTColumnFilter) {
    (filter._default as any).value =
      filter._menus!.value.findIndex(w => w.checked!) !== -1;
  }

  updateIndeterminate(filter: ISTColumnFilter) {
    const menus = filter._menus!;
    const checkedCount = menus.value.filter(w => w.checked).length;
    filter.indeterminate!.value =
      checkedCount > 0 && checkedCount !== menus.value.length;
    filter.checkAll!.value = checkedCount === menus.value.length;
  }
}
