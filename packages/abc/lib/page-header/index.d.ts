import { App } from "vue";
import PageHeader from "./src/index.vue";
declare type SFCWithInstall<T> = T & {
    install(app: App): void;
};
declare const _PageHeader: SFCWithInstall<typeof PageHeader>;
export default _PageHeader;
