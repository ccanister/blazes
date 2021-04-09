import { IApp, ILayout, IUser } from "./type";
export declare class SettingService {
    private _app;
    private _layout;
    private _user;
    get app(): IApp | null;
    get user(): IUser | null;
    get layout(): ILayout | null;
    setApp(app: IApp): void;
    setLayout(name: ILayout | string, value?: any): void;
    setUser(user: IUser): void;
    private setData;
    private getData;
}
