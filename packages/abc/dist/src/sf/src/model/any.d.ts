import BaseModel from "./base";
export default class AnyModel extends BaseModel<any> {
    fallbackValue(value: any): any;
}
