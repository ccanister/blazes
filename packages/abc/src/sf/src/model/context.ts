import AnyModel from "./any";
import NumberModel from "./boolean";
import StringModel from "./string";
import BoolModel from "./boolean";

export const typeModels: Record<string, any> = {
  string: StringModel,
  regexp: StringModel,
  any: AnyModel,
  number: NumberModel,
  boolean: BoolModel,
};
