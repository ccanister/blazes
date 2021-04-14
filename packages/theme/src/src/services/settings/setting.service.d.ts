import { IApp, ILayout, IUser, IProject } from "./type";
export declare class SettingService {
    private _app;
    private _layout;
    private _user;
    private _project;
    get project(): IProject;
    get app(): IApp;
    get user(): IUser;
    get layout(): ILayout;
    setApp(app: IApp): void;
    setLayout(name: ILayout | string, value?: any): void;
    setUser(user: IUser): void;
    setProject(project: IProject): void;
    private setData;
    private getData;
}
