import { IMenu } from "./type";
import { Ref, ref } from "vue";

const COLLAPSE_KEY = "collapse";
export class MenuService {
  menus: Ref<IMenu[]> = ref([]);

  private _collapse: Ref<boolean> = ref(this.getData(COLLAPSE_KEY));

  get collapse() {
    return this._collapse;
  }

  toggle() {
    const isCollapse = (this._collapse.value = !this._collapse.value);
    this.setData(COLLAPSE_KEY, isCollapse);
  }

  // 未添加acl权限
  add(imenus: IMenu[]) {
    this.menus.value = this.addMenuKey(imenus);
  }

  private addMenuKey(
    menus: IMenu[],
    prefix = "0",
    parent: IMenu | null = null
  ) {
    menus.forEach((menu: IMenu, index: number) => {
      const key = prefix + "-" + index;
      menu.key = key;
      menu.children = menu.children || [];
      menu._parent = parent;
      menu.link = menu.link || "/";
      this.addMenuKey(menu.children, key, menu);
    });

    return menus;
  }

  // recursive 向上查找
  //    /detail/1 ->  如果没找到就会去查找/detail路由
  getPathByUrl(url: string, recursive = true) {
    const ret: IMenu[] = [];
    let item = this.getHit(url, recursive);

    if (!item) {
      return ret;
    }
    while (item) {
      ret.unshift(item);
      item = item._parent as IMenu;
    }

    return ret;
  }

  getHit(url: string, recursive: boolean): IMenu | null {
    const menus = this.menus.value;
    let item: IMenu | null = null;
    while (!item) {
      this.visit(menus, (menu: IMenu) => {
        if (menu.link != null && menu.link === url) {
          item = menu;
        }
      });
      if (!recursive) {
        return null;
      }

      if (/[?;]/g.test(url)) {
        url = url.split(/[?;]/g)[0];
      } else {
        url = url.split("/").slice(0, -1).join("/");
      }
    }
    return item;
  }

  private visit(
    data: IMenu[],
    callback: (item: IMenu, parentIMenum: IMenu | null, depth?: number) => void
  ): void {
    const inFn = (list: IMenu[], parentMenu: IMenu | null, depth: number) => {
      for (const item of list) {
        callback(item, parentMenu, depth);
        if (item.children && item.children.length > 0) {
          inFn(item.children, item, depth + 1);
        } else {
          item.children = [];
        }
      }
    };

    inFn(data, null, 0);
  }

  private setData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private getData(key: string) {
    return JSON.parse(localStorage.getItem(key) || "null");
  }
}

export const menuService = new MenuService();
