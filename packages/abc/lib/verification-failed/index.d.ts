import { App } from "vue";
import VerificationFailed from "./src/index.vue";
declare type SFCWithInstall<T> = T & {
    install(app: App): void;
};
declare const _verificationFailed: SFCWithInstall<typeof VerificationFailed>;
export default _verificationFailed;
