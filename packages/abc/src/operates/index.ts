import { App } from "vue";
import Operates from "./src/index.vue";

type SFCWithInstall<T> = T & { install(app: App): void };

Operates.install = (app: App): void => {
  app.component(Operates.name, Operates);
};

const _Operates: SFCWithInstall<typeof Operates> = Operates as any;
export default _Operates;
export * from "./src/type";
