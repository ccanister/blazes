import { MenuService } from "../menu/menu.service";
export declare class TitleService {
    private menuService;
    default: string;
    constructor(menuService: MenuService);
    watchRoute(): void;
    setTitle(title?: string): void;
    private getByRoute;
    private getByMenu;
    private getByElement;
}
