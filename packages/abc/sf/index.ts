import { App } from "vue";
import sf from "./src/index.vue";

type SFCWithInstall<T> = T & { install(app: App): void };

sf.install = (app: App): void => {
  app.component(sf.name, sf);
};

const _sf: SFCWithInstall<typeof sf> = sf as any;
export default _sf;
