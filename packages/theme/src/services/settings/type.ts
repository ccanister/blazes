export interface IApp {
  name: string;
  description: string;
  [key: string]: any;
}

export interface IUser {
  id: number;
  name: string;
  phone: string;
  account: string;
  [key: string]: any;
}

export interface ILayout {
  collapse: boolean;
}

export interface IProject {
  id: number;
  name: string;
}
