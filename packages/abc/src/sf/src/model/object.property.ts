import { ISFSchema, ISFUISchemaItem, SFValue } from "../type";
import { FormProperty, PropertyGroup } from "./form.property";
import { FormPropertyFactory } from "./form.property.factory";

export class ObjectProperty extends PropertyGroup {
  private _propertiesId: string[] = [];

  get propertiesId(): string[] {
    return this._propertiesId;
  }

  constructor(
    private formPropertyFactory: FormPropertyFactory,
    schema: ISFSchema,
    ui: ISFUISchemaItem,
    formData: SFValue,
    parent: PropertyGroup | null,
    path: string
  ) {
    super(schema, ui, formData, parent, path);
    this.createProperties();
  }

  private createProperties(): void {
    this.properties = {};
    this._propertiesId = [];
    const orderedProperties = Object.keys(this.schema.properties!);
    orderedProperties!.forEach((propertyId) => {
      (this.properties as { [key: string]: FormProperty })[
        propertyId
      ] = this.formPropertyFactory.createProperty(
        this.schema.properties![propertyId],
        this.ui["$" + propertyId],
        ((this.formData || {}) as SFValue)[propertyId],
        this,
        propertyId
      );
      this._propertiesId.push(propertyId);
    });
  }

  setValue(value: SFValue): void {
    const properties = this.properties as { [key: string]: FormProperty };
    for (const propertyId in value) {
      if (
        Object.hasOwnProperty.call(value, propertyId) &&
        properties[propertyId]
      ) {
        (properties[propertyId] as FormProperty).setValue(
          value[propertyId],
          true
        );
      }
    }
    this.updateValueAndValidity();
  }

  resetValue(value: SFValue, onlySelf: boolean): void {
    value = value || this.schema.default || {};
    const properties = this.properties as { [key: string]: FormProperty };
    // tslint:disable-next-line: forin
    for (const propertyId in this.schema.properties) {
      properties[propertyId].resetValue(value[propertyId], true);
    }
    this.updateValueAndValidity({ onlySelf });
  }

  _hasValue(): boolean {
    return this.value != null && !!Object.keys(this.value).length;
  }

  _updateValue(): void {
    const value: SFValue = {};
    this.forEachChild((property, propertyId) => {
      if (property.visible && property._hasValue()) {
        value[propertyId] = property.value;
      }
    });
    this._value = value;
  }
}
