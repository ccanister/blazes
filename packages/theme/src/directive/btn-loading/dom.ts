import { AxiosInstance } from "axios";
import { registerAxios } from "./register-axios";
import btnLoadingService from "./service";

interface IElType extends HTMLButtonElement {
  handler: () => void;
}

export class BtnLoading {
  constructor(axios: AxiosInstance) {
    registerAxios(axios);
  }

  beforeMount(el: IElType) {
    btnLoadingService.register(el);
    el.handler = () => {
      btnLoadingService.latestEl = el;
    };
    el.addEventListener("click", el.handler);
  }

  unmounted(el: IElType) {
    btnLoadingService.unsubscribe(el);
    el.removeEventListener("click", el.handler);
  }
}
