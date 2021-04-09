import { App } from "vue";
import Tags from "./src/index.vue";
declare type SFCWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Tags: SFCWithInstall<typeof Tags>;
export default _Tags;
