import { ISFSchema, ISFUISchemaItem, SFValue } from "../type";
import { PropertyGroup } from "./form.property";
import { FormPropertyFactory } from "./form.property.factory";
export declare class ObjectProperty extends PropertyGroup {
    private formPropertyFactory;
    private _propertiesId;
    get propertiesId(): string[];
    constructor(formPropertyFactory: FormPropertyFactory, schema: ISFSchema, ui: ISFUISchemaItem, formData: SFValue, parent: PropertyGroup | null, path: string);
    private createProperties;
    setValue(value: SFValue): void;
    resetValue(value: SFValue, onlySelf: boolean): void;
    _hasValue(): boolean;
    _updateValue(): void;
}
