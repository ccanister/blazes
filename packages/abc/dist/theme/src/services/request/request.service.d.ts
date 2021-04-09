import { AxiosInstance, AxiosRequestConfig } from "axios";
export interface IConfig extends AxiosRequestConfig {
    useCsrf?: boolean;
    useBtnLoading?: boolean;
    deDuplication?: boolean;
}
export declare let instance: AxiosInstance;
export declare class RequestService {
    instance: AxiosInstance;
    private CancelToken;
    private theQueue;
    constructor(config: IConfig);
    private genInstance;
    private addCsrfToken;
    private addDeDuplication;
    private findInQueue;
    private removeQueue;
}
