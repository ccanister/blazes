import { Ref } from "vue";
import { MenuService } from "./menu.service";
export declare function useCollapse(menuService: MenuService): {
    active: Ref<string[]>;
    opened: Ref<string[]>;
};
