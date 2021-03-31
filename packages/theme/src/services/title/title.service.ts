import { ArrayService } from "@flame/utils";
import { useRoute, useRouter } from "vue-router";
import { MenuService } from "../menu/menu.service";

export class TitleService {
  default = `Not Page Name`;

  constructor(private menuService: MenuService) {}

  watchRoute() {
    const router = useRouter();
    router.afterEach(() => {
      this.setTitle();
    });
  }

  setTitle(title?: string) {
    if (!title) {
      title =
        this.getByRoute() ||
        this.getByMenu() ||
        this.getByElement() ||
        this.default;
    }

    document.body.title = title as string;
  }

  private getByRoute() {
    const { matched } = useRoute();
    if (matched.length > 0 && matched[matched.length - 1].name) {
      return ArrayService.getLast(matched)?.name?.toString();
    }

    return "";
  }

  private getByMenu() {
    const { path } = useRoute();

    const menus = this.menuService.getPathByUrl(path);
    if (!menus || menus.length < 0) {
      return "";
    }
    return menus[menus.length - 1].text;
  }

  private getByElement() {
    const el = document.querySelector(".page-header .main h1") as HTMLElement;
    if (el) {
      return el.innerText.trim();
    }

    return "";
  }
}
