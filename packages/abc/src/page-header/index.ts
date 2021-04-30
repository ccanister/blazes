import { App } from "vue";
import PageHeader from "./src/index.vue";

type SFCWithInstall<T> = T & { install(app: App): void };

PageHeader.install = (app: App): void => {
  app.component(PageHeader.name, PageHeader);
};

const _PageHeader: SFCWithInstall<typeof PageHeader> = PageHeader as any;
export default _PageHeader;
