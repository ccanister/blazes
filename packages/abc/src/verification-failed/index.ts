import { App } from "vue";
import VerificationFailed from "./src/index.vue";

type SFCWithInstall<T> = T & { install(app: App): void };

VerificationFailed.install = (app: App): void => {
  app.component(VerificationFailed.name, VerificationFailed);
};

const _verificationFailed: SFCWithInstall<
  typeof VerificationFailed
> = VerificationFailed as any;
export default _verificationFailed;
export { VerificationFailed };
