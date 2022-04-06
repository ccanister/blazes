import { ISFSchema, ISFUISchemaItem, SFValue, SF_SEQ } from "../type";
import { FormProperty, PropertyGroup } from "./form.property";
import { FormPropertyFactory } from "./form.property.factory";
import { ObjectProperty } from "./object.property";

export class ArrayProperty extends PropertyGroup {
  constructor(
    private formPropertyFactory: FormPropertyFactory,
    schema: ISFSchema,
    ui: ISFUISchemaItem,
    formData: Record<string, unknown>,
    parent: PropertyGroup | null,
    path: string
  ) {
    super(schema, ui, formData, parent, path);
    this.properties = [];
  }

  getProperty(path: string): FormProperty | undefined {
    const subPathIdx = path.indexOf(SF_SEQ);
    const pos = +(subPathIdx !== -1 ? path.substr(0, subPathIdx) : path);
    const list = this.properties as PropertyGroup[];
    if (isNaN(pos) || pos >= list.length) {
      return undefined;
    }
    if (subPathIdx === -1) {
      return list[pos];
    }
    const subPath = path.substr(subPathIdx + 1);
    return list[pos].getProperty(subPath);
  }

  setValue(value: SFValue, onlySelf: boolean): void {
    this.properties = [];
    this.resetProperties(value);
    this.updateValueAndValidity({ onlySelf });
  }

  resetValue(value: SFValue, onlySelf: boolean): void {
    this._value = value || this.schema.default || [];
    this.setValue(this._value, onlySelf);
  }

  _hasValue(): boolean {
    return true;
  }

  _updateValue(): void {
    const value: any[] = [];
    this.forEachChild((property: FormProperty) => {
      if (property.visible) {
        if (property instanceof ObjectProperty) {
          value.push({
            ...property.formData,
            ...property.value,
          });
        } else {
          value.push(property.value);
        }
      }
    });
    this._value = value;
  }

  private addProperty(formData: Record<string, unknown>): FormProperty {
    const newProperty = this.formPropertyFactory.createProperty(
      this.schema.items!,
      this.ui.$items,
      formData,
      this as PropertyGroup
    ) as ObjectProperty;
    (this.properties as FormProperty[]) = [
      ...(this.properties as FormProperty[]),
      newProperty,
    ];
    return newProperty;
  }

  private resetProperties(formDatas: Array<Record<string, unknown>>): void {
    for (const item of formDatas) {
      const property = this.addProperty(item);
      property.resetValue(item, true);
    }
  }

  add(formData: Record<string, unknown>): FormProperty {
    const newProperty = this.addProperty(formData);
    newProperty.resetValue(formData, false);
    return newProperty;
  }

  remove(index: number): void {
    const list = this.properties as FormProperty[];
    list.splice(index, 1);
    list.forEach((property, idx) => {
      property.path = [property.parent!.path, idx].join(SF_SEQ);
      if (property instanceof ObjectProperty) {
        property.forEachChild((p) => {
          p.updateValueAndValidity();
        });
      }
    });
    if (list.length === 0) {
      this.updateValueAndValidity();
    }
  }
}
