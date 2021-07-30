import { SFValue } from "../type";
import { FormProperty } from "./form.property";

export abstract class AtomicProperty extends FormProperty {
  abstract fallbackValue(value: SFValue): SFValue;

  setValue(value: SFValue): void {
    this._value = this.fallbackValue(value);
    this.updateValueAndValidity();
  }
}
