import { ISFSchema, ISFUISchemaItem, SFValue } from "../type";
import { FormProperty, PropertyGroup } from "./form.property";
import { FormPropertyFactory } from "./form.property.factory";
export declare class ArrayProperty extends PropertyGroup {
    private formPropertyFactory;
    constructor(formPropertyFactory: FormPropertyFactory, schema: ISFSchema, ui: ISFUISchemaItem, formData: Record<string, unknown>, parent: PropertyGroup | null, path: string);
    getProperty(path: string): FormProperty | undefined;
    setValue(value: SFValue, onlySelf: boolean): void;
    resetValue(value: SFValue, onlySelf: boolean): void;
    _hasValue(): boolean;
    _updateValue(): void;
    private addProperty;
    private resetProperties;
    add(formData: Record<string, unknown>): FormProperty;
    remove(index: number): void;
}
