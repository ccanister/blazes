import { App } from "vue";
import TableWrapper from "./src/index.vue";
declare type SFCWithInstall<T> = T & {
    install(app: App): void;
};
declare const _TableWrapper: SFCWithInstall<typeof TableWrapper>;
export default _TableWrapper;
