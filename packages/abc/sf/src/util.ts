import { deepCopy } from "@flame/utils";
import { ISFSchema, ISFSchemaEnum, ISFUISchemaItem } from "./type";

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
      .then(list => getEnum(list, formData, schema.readOnly as boolean));
  }

  return Promise.resolve(
    getCopyEnum(
      schema.enums as ISFSchemaEnum[],
      formData,
      schema.readOnly as boolean
    )
  );
}
