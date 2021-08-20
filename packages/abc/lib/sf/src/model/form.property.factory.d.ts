import { ISFSchema, ISFUISchemaItem } from "../type";
import { FormProperty, PropertyGroup } from "./form.property";
export declare class FormPropertyFactory {
    createProperty(schema: ISFSchema, ui: ISFUISchemaItem, formData: Record<string, unknown>, parent?: PropertyGroup | null, propertyId?: string): FormProperty;
    private initializeRoot;
}
