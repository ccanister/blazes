import { deepCopy } from "@blazes/utils";
import { FormProperty } from "./model";
import { ISFSchema, ISFSchemaEnum, ISFUISchemaItem, SFValue } from "./type";

export function isBlank(o: any): boolean {
  return o == null;
}

export function getEnum(
  list: any[],
  formData: any,
  readOnly: boolean
): ISFSchemaEnum[] {
  if (isBlank(list) || !Array.isArray(list) || list.length === 0) return [];
  if (typeof list[0] !== "object") {
    list = list.map((item: any) => {
      return { label: item, value: item } as ISFSchemaEnum;
    });
  }
  if (formData) {
    if (!Array.isArray(formData)) formData = [formData];
    list.forEach((item: ISFSchemaEnum) => {
      if (~formData.indexOf(item.value)) item.checked = true;
    });
  }
  // fix disabled status
  if (readOnly) {
    list.forEach((item: ISFSchemaEnum) => (item.disabled = true));
  }
  return list;
}

export function getCopyEnum(
  list: any[],
  formData: any,
  readOnly: boolean
): ISFSchemaEnum[] {
  return getEnum(deepCopy(list || []), formData, readOnly);
}

export function getData(schema: ISFSchema, ui: ISFUISchemaItem, formData: any) {
  if (ui.asyncData) {
    return ui
      .asyncData()
      .then((list) => getEnum(list, formData, schema.readOnly as boolean));
  }

  return Promise.resolve(
    getCopyEnum(
      schema.enums as ISFSchemaEnum[],
      formData,
      schema.readOnly as boolean
    )
  );
}

export function transMapToEnum(map: { [key: string]: any }): ISFSchemaEnum[] {
  return Object.keys(map).map((key) => ({
    label: map[key],
    value: key,
  }));
}

export function resetData(value: SFValue, property: FormProperty) {
  Object.keys(value || {}).forEach((prop) => {
    const formProperty = property.searchProperty(`${prop}`)!;
    if (!formProperty) {
      return;
    }
    const widget = formProperty.widget;
    if (widget?.reset) {
      widget.reset(value[prop]);
    }
  });
}
