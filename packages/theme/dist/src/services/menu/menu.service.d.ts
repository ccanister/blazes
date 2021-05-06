import { IMenu } from "./type";
import { Ref } from "vue";
export declare class MenuService {
    menus: Ref<IMenu[]>;
    private _collapse;
    get collapse(): Ref<boolean>;
    toggle(): void;
    add(imenus: IMenu[]): void;
    private addMenuKey;
    getPathByUrl(url: string, recursive?: boolean): IMenu[];
    getHit(url: string, recursive: boolean): IMenu | null;
    private visit;
    private setData;
    private getData;
}
export declare const menuService: MenuService;
