import btnLoadingService from "./service";

interface IElType extends HTMLButtonElement {
  handler: () => void;
}

export class BtnLoading {
  beforeMount(el: IElType) {
    console.log(el);
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
