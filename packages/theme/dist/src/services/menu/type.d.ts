export interface IMenu {
    text: string;
    link?: string;
    icon?: string;
    disabled?: string;
    hidden?: string;
    acl?: string;
    key?: string;
    children?: IMenu[];
    _parent: IMenu | null;
    desc?: string;
}
