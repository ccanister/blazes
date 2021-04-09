import { ISFSchema, ISFSchemaEnum, ISFUISchemaItem } from "./type";
export declare function isBlank(o: any): boolean;
export declare function getEnum(list: any[], formData: any, readOnly: boolean): ISFSchemaEnum[];
export declare function getCopyEnum(list: any[], formData: any, readOnly: boolean): ISFSchemaEnum[];
export declare function getData(schema: ISFSchema, ui: ISFUISchemaItem, formData: any): Promise<ISFSchemaEnum[]>;
