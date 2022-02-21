import Modal, { ModalFuncProps } from "ant-design-vue/es/modal";
import Drawer from "ant-design-vue/es/drawer";
import { AppContext, h, isVNode, render, VNode } from "vue";

export interface IModalOption extends ModalFuncProps {
  component: any;
  componentParams?: { [key: string]: any };
  closable?: boolean;
}

export interface IDrawerOption {
  component: any;
  componentParams?: { [key: string]: any };
  title?: string;
  mask?: boolean;
  prefixCls?: string;
  keyboard?: boolean;
  height?: string | number;
  width?: string | number;
  zIndex?: number;
  maskClosable?: boolean;
  bodyStyle?: {
    [key: string]: any;
  };
  closable?: boolean;
  onClose?: (...args: any[]) => any;
  placement?: "bottom" | "left" | "right" | "top";
  level?: any;
  afterVisibleChange?: (...args: any[]) => any;
  maskStyle?: {
    [key: string]: any;
  };
  wrapStyle?: {
    [key: string]: any;
  };
  headerStyle?: {
    [key: string]: any;
  };
  drawerStyle?: {
    [key: string]: any;
  };
  wrapClassName?: string;
}

export interface IDialogRef<T = any> {
  instance: VNode;
  close: (result?: T) => any;
  afterClose: Promise<T>;
  content: any;
}

let seed = 1;

export class ModalHelper {
  private static _appContext: AppContext | null = null;
  static set appContext(appContext: AppContext | null) {
    this._appContext = appContext;
  }
  static get appContext() {
    return this._appContext;
  }

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
    instance.appContext = this.appContext;
    render(instance, container);

    let resolveAfterClose: (value: any) => void;
    const afterClose: Promise<T> = new Promise(
      (resolve) => (resolveAfterClose = resolve)
    );
    function close(result?: T) {
      config.onCancel?.();
      (instance.component!.proxy as any).sVisible = false;
      setTimeout(() => {
        document.body.removeChild(container);
        resolveAfterClose(result instanceof Event ? null : result);
      }, 200);
    }
    const dialogRef = { instance, close, afterClose, content };
    if (contentIsComponent) {
      content.props.dialogRef = dialogRef;
    }

    return {
      dialogRef,
    };
  }

  static openDrawer<T>(
    config: IDrawerOption,
    renderContainer = document.body
  ): { dialogRef: IDialogRef<T> } {
    const container = document.createElement("div");
    const id = "drawer_" + seed++;

    container.className = `container_${id}`;
    renderContainer.appendChild(container);

    const { component, componentParams } = config;
    const contentIsComponent =
      typeof component === "object" && !isVNode(component);
    const content = contentIsComponent
      ? h(component, componentParams || {})
      : component;

    const instance = h(
      Drawer as any,
      {
        ...config,
        getContainer: () => container,
        visible: true,
        onClose: close,
      },
      {
        default: () => content,
      }
    );
    instance.appContext = this.appContext;
    render(instance, container);

    let resolveAfterClose: (value: any) => void;
    const afterClose: Promise<T> = new Promise(
      (resolve) => (resolveAfterClose = resolve)
    );
    function close(result?: T) {
      instance.component!.props.visible = false;
      config.onClose && config.onClose();
      setTimeout(() => {
        renderContainer.removeChild(container);
        resolveAfterClose(result instanceof Event ? null : result);
      }, 200);
    }
    const dialogRef = { instance, close, afterClose, content };
    if (contentIsComponent) {
      content.props.dialogRef = dialogRef;
    }

    return {
      dialogRef,
    };
  }
}
