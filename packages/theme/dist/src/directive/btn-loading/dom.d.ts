import { AxiosInstance } from "axios";
interface IElType extends HTMLButtonElement {
    handler: () => void;
}
export declare class BtnLoading {
    constructor(axios: AxiosInstance);
    beforeMount(el: IElType): void;
    unmounted(el: IElType): void;
}
export {};
