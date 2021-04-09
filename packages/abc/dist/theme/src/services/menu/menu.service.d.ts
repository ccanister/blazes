import { IMenu } from "./type";
import { Ref } from "vue";
export declare class MenuService {
    menus: Ref<IMenu[]>;
    private constructor();
    static getInstance(): MenuService;
    add(imenus: IMenu[]): void;
    private addMenuKey;
    getPathByUrl(url: string, recursive?: boolean): IMenu[];
    getHit(url: string, recursive: boolean): IMenu | null;
    private visit;
}
declare const _default: MenuService;
export default _default;
