import { App } from "vue";
import Ellipsis from "./src/index.vue";

type SFCWithInstall<T> = T & { install(app: App): void };

Ellipsis.install = (app: App): void => {
  app.component(Ellipsis.name, Ellipsis);
};

const _Ellipsis: SFCWithInstall<typeof Ellipsis> = Ellipsis as any;
export default _Ellipsis;
