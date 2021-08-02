import { ISFSchema, ISFUISchemaItem, SF_SEQ } from "../type";
import { AnyProperty } from "./any.property";
import { BooleanProperty } from "./boolean.property";
import { FormProperty, PropertyGroup } from "./form.property";
import { NumberProperty } from "./number.property";
import { ObjectProperty } from "./object.property";
import { StringProperty } from "./string.property";

export class FormPropertyFactory {
  createProperty(
    schema: ISFSchema,
    ui: ISFUISchemaItem,
    formData: Record<string, unknown>,
    parent: PropertyGroup | null = null,
    propertyId?: string
  ): FormProperty {
    let newProperty: FormProperty | null = null;
    let path = "";
    if (parent) {
      path += parent.path;
      if (parent.parent !== null) {
        path += SF_SEQ;
      }
      switch (parent.type) {
        case "object":
          path += propertyId;
          break;
        default:
          throw new Error(
            "Instanciation of a FormProperty with an unknown parent type: " +
              parent.type
          );
      }
    } else {
      path = SF_SEQ;
    }

    switch (schema.type) {
      case "number":
        newProperty = new NumberProperty(schema, ui, formData, parent, path);
        break;
      case "string":
        newProperty = new StringProperty(schema, ui, formData, parent, path);
        break;
      case "boolean":
        newProperty = new BooleanProperty(schema, ui, formData, parent, path);
        break;
      case "object":
        newProperty = new ObjectProperty(
          this,
          schema,
          ui,
          formData,
          parent,
          path
        );
        break;
      case "any":
        newProperty = new AnyProperty(schema, ui, formData, parent, path);
        break;
      // case 'array':
      //   newProperty = new ArrayProperty(this, schema, ui, formData, parent, path);
      //   break;
      default:
        throw new TypeError(`Undefined type ${schema.type}`);
    }

    if (newProperty instanceof PropertyGroup) {
      this.initializeRoot(newProperty);
    }

    return newProperty as FormProperty;
  }

  private initializeRoot(rootProperty: PropertyGroup): void {
    // rootProperty.init();
    rootProperty._bindVisibility();
  }
}
