import BaseModel from "./base";

export default class NumberModel extends BaseModel<number | null> {
  fallbackValue(value: any): number | null {
    if (typeof value === "string") {
      return value.length > 0 ? +value : null;
    }
    return +value;
  }
}
