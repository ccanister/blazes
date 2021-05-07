declare class BtnLoadingService {
    private registerBtnMap;
    latestEl: HTMLButtonElement | null;
    private loadingBtnMap;
    startLoading(url: string): void;
    stopLoading(url: string): void;
    register(el: HTMLButtonElement): void;
    unsubscribe(el: HTMLButtonElement): void;
}
declare const btnLoadingService: BtnLoadingService;
export default btnLoadingService;
