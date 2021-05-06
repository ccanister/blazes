import Modal from "ant-design-vue/lib/modal";
import { ModalFuncProps } from "ant-design-vue/lib/modal";
import { h, isVNode, render, VNode } from "vue";

export interface IModalOption extends ModalFuncProps {
  component: any;
  componentParams?: { [key: string]: any };
  closable?: boolean;
}

export interface IDialogRef<T = any> {
  instance: VNode;
  close: (result?: T) => any;
  afterClose: Promise<T>;
}

let seed = 1;

export class ModalHelper {
  static open<T>(config: IModalOption): { dialogRef: IDialogRef<T> } {
    const container = document.createElement("div");
    const id = "dialog_" + seed++;

    container.className = `container_${id}`;
    document.body.appendChild(container);

    const { component, componentParams } = config;
    const contentIsComponent =
      typeof component === "object" && !isVNode(component);
    const content = contentIsComponent
      ? h(component, componentParams || {})
      : component;

    const instance = h(
      Modal as any,
      {
        footer: null,
        ...config,
        getContainer: () => container,
        visible: true,
        onCancel: close,
      },
      {
        default: () => content,
      }
    );
    render(instance, container);

    let resolveAfterClose: (value: any) => void;
    const afterClose: Promise<T> = new Promise(
      (resolve) => (resolveAfterClose = resolve)
    );
    function close(result?: T) {
      (instance.component!.proxy as any).sVisible = false;
      setTimeout(() => {
        document.body.removeChild(container);
        resolveAfterClose(result instanceof Event ? null : result);
      }, 200);
    }
    const dialogRef = { instance, close, afterClose };
    if (contentIsComponent) {
      // 需要适配
      (content as any).props.dialogRef = dialogRef;
    }

    return {
      dialogRef,
    };
  }
}
