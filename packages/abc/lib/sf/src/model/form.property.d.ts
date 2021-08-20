import { DefineComponent } from "vue";
import { Ref } from "vue";
import { ISFFormValueChange, ISFSchema, ISFSchemaType, ISFUISchemaItem, ISFUpdateValueAndValidity, SFValue } from "../type";
export declare abstract class FormProperty {
    _valueChanges: Ref<ISFFormValueChange>;
    private _root;
    private _parent;
    _visibilityChanges: Ref<boolean>;
    formData: Record<string, unknown>;
    _value: SFValue;
    path: string;
    schema: ISFSchema;
    ui: ISFUISchemaItem;
    widget: DefineComponent | null;
    constructor(schema: ISFSchema, ui: ISFUISchemaItem, formData: Record<string, unknown>, parent: PropertyGroup | null, path: string);
    get type(): ISFSchemaType;
    get parent(): PropertyGroup | null;
    get root(): PropertyGroup;
    get value(): SFValue;
    get visible(): boolean;
    abstract setValue(value: SFValue, onlySelf: boolean): void;
    abstract _updateValue(): void;
    abstract _hasValue(): boolean;
    /** 因为没有做【重置】功能，所以现在只会在组件初始化的时候调用 */
    abstract resetValue(value: SFValue, onlySelf: boolean): void;
    updateValueAndValidity(options?: ISFUpdateValueAndValidity): void;
    setVisible(visible: boolean): void;
    /** 根据路径搜索表单属性 */
    searchProperty(path: string): FormProperty | null;
    bindVisibility(): void;
}
export declare abstract class PropertyGroup extends FormProperty {
    properties: {
        [key: string]: FormProperty;
    } | FormProperty[] | null;
    getProperty(path: string): FormProperty | undefined;
    forEachChild(fn: (formProperty: FormProperty, str: string) => void): void;
    forEachChildRecursive(fn: (formProperty: FormProperty) => void): void;
    _bindVisibility(): void;
    private _bindVisibilityRecursive;
    isRoot(): boolean;
}
