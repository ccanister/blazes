import { App } from "vue";
import sf from "./src/index.vue";
declare type SFCWithInstall<T> = T & {
    install(app: App): void;
};
declare const _sf: SFCWithInstall<typeof sf>;
export default _sf;
export * from "./src/util";
export { formRefSymbol, formSymbol } from "./src/type";
