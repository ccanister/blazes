import { h, render } from "vue";
import { addClass, prepend, removeClass } from "@blazes/utils";
import { LoadingOutlined } from "@ant-design/icons-vue";

class BtnLoadingService {
  private registerBtnMap: WeakMap<
    HTMLButtonElement,
    { icon?: HTMLElement }
  > = new WeakMap();
  latestEl!: HTMLButtonElement | null;
  private loadingBtnMap: Map<string, HTMLButtonElement> = new Map();

  startLoading(url: string) {
    const { registerBtnMap, latestEl: el, loadingBtnMap } = this;
    console.log(el);
    
    if (el) {
      console.log(this.registerBtnMap.has(el));
      if (this.registerBtnMap.has(el)) {
        loadingBtnMap.set(url, el);
        addClass(el, "ant-btn-loading");
        const value = registerBtnMap.get(el) as any;
        let icon = value?.icon;
        if (!icon) {
          icon = document.createElement("span");
          addClass(icon, "anticon anticon-loading");
          const loading = h(LoadingOutlined);
          render(loading, icon);
          value.icon = icon;
        }
        prepend(el, icon);
      }
      this.latestEl = null;
    }
  }

  stopLoading(url: string) {
    const { registerBtnMap, loadingBtnMap } = this;
    const el = loadingBtnMap.get(url);

    if (el) {
      removeClass(el, "ant-btn-loading");
      el.removeChild(registerBtnMap.get(el)?.icon as HTMLElement);
      loadingBtnMap.delete(url);
    }
  }

  register(el: HTMLButtonElement) {
    this.registerBtnMap.set(el, {});
  }

  unsubscribe(el: HTMLButtonElement) {
    this.registerBtnMap.delete(el);
  }
}

export default new BtnLoadingService();
