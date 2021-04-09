import { ModalFuncProps } from "ant-design-vue/lib/modal";
import { VNode } from "vue";
export interface IModalOption extends ModalFuncProps {
    component: any;
    componentParams?: {
        [key: string]: any;
    };
    closable?: boolean;
}
export interface IDialogRef<T = any> {
    instance: VNode;
    close: (result?: T) => any;
    afterClose: Promise<T>;
}
export declare class ModalHelper {
    static open<T>(config: IModalOption): {
        dialogRef: IDialogRef<T>;
    };
}
