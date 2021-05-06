import BaseModel from "./base";

export default class NumberModel extends BaseModel<boolean> {
  fallbackValue(value: any): boolean {
    return !!value;
  }
}
