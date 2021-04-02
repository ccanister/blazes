import { App } from "vue";
import Tags from "./src/index.vue";

type SFCWithInstall<T> = T & { install(app: App): void };

Tags.install = (app: App): void => {
  app.component(Tags.name, Tags);
};

const _Tags: SFCWithInstall<typeof Tags> = Tags as any;
export default _Tags;
