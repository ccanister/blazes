import BaseModel from "./base";
export default class NumberModel extends BaseModel<number | null> {
    fallbackValue(value: any): number | null;
}
