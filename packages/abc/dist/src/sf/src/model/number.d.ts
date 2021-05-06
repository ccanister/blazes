import BaseModel from "./base";
export default class NumberModel extends BaseModel<number> {
    fallbackValue(value: any): number;
}
