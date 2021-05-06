import BaseModel from "./base";

export default class StringModel extends BaseModel<string> {
  fallbackValue(value: any): string {
    return `${value}`;
  }
}
