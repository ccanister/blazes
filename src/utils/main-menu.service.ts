import { meta as ComponentsMeta } from "@/views/components/meta";
import { meta as DocsMeta } from "@/views/docs/meta";
import { meta as AclMeta } from "@/views/acl/meta";
import { watch, onMounted } from "vue";
import { useRoute } from "vue-router";

const ALL_METAS = [ComponentsMeta, DocsMeta, AclMeta];

interface MenuSub {
  title: string;
  subtitle: string;
  path: string;
  order?: number;
}

export interface MenuItem {
  type: string;
  subs: MenuSub[];
}

export class MainMenuService {
  private _menus: MenuItem[] = [];

  get menus() {
    return this._menus;
  }

  constructor() {
    const route = useRoute();
    onMounted(() => {
      watch(
        () => route.path,
        (url) => {
          this.genMenus(url);
        }
      );
    });
  }

  private genMenus(url: string) {
    const categoryName = url.split("/")[1];
    const category = ALL_METAS.find((meta) => meta.name === categoryName);
    if (!category) {
      return;
    }
    this._menus = category.items;
  }
}

export const mainMenuServiceSymbol = Symbol("MainMenuService");
