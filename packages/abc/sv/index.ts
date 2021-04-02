import { App } from "vue";
import Sv from "./src/index.vue";

type SFCWithInstall<T> = T & { install(app: App): void };

Sv.install = (app: App): void => {
  app.component(Sv.name, Sv);
};

const _Sv: SFCWithInstall<typeof Sv> = Sv as any;
export default _Sv;
