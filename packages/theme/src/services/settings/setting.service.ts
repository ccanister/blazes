import { IApp, ILayout, IUser } from "./type";

const APP_KEY = "app";
const LAYOUT_KEY = "layout";
const USER_KEY = "user";

export class SettingService {
  private _app: IApp | null = null;
  private _layout: ILayout | null = null;
  private _user: IUser | null = null;

  get app() {
    if (!this._app) {
      this._app = {
        ...this.getData(APP_KEY),
      };
      this.setData(APP_KEY, this._app);
    }

    return this._app;
  }

  get user() {
    if (!this._user) {
      this._user = {
        ...this.getData(USER_KEY),
      };
      this.setData(USER_KEY, this._user);
    }

    return this._user;
  }

  get layout() {
    if (!this._layout) {
      this._layout = {
        collapse: false,
        ...this.getData(LAYOUT_KEY),
      };
      this.setData(LAYOUT_KEY, this._layout);
    }

    return this._layout;
  }

  setApp(app: IApp) {
    this._app = app;
    this.setData(APP_KEY, app);
  }

  setLayout(name: ILayout | string, value?: any) {
    if (typeof name === "string") {
      (this._layout as any)[name] = value;
    } else {
      this._layout = name;
    }
    this.setData(LAYOUT_KEY, this._layout);
  }

  setUser(user: IUser) {
    this._user = user;
    this.setData(USER_KEY, user);
  }

  private setData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private getData(key: string) {
    return JSON.parse(localStorage.getItem(key) || "null");
  }
}
