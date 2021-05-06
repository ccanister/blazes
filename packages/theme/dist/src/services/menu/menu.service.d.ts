import { IMenu } from "./type";
import { Ref } from "vue";
export declare class MenuService {
    menus: Ref<IMenu[]>;
    private _collapse;
    get collapse(): Ref<boolean>;
    toggle(): void;
    static getInstance(): MenuService;
    add(imenus: IMenu[]): void;
    private addMenuKey;
    getPathByUrl(url: string, recursive?: boolean): IMenu[];
    getHit(url: string, recursive: boolean): IMenu | null;
    private visit;
    private setData;
    private getData;
}
declare const _default: MenuService;
export default _default;
