interface IElType extends HTMLButtonElement {
    handler: () => void;
}
export declare class BtnLoading {
    beforeMount(el: IElType): void;
    unmounted(el: IElType): void;
}
export {};
