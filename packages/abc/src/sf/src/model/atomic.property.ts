import { SFValue } from "../type";
import { FormProperty } from "./form.property";

export abstract class AtomicProperty extends FormProperty {
  abstract fallbackValue(value: SFValue): SFValue;

  setValue(value: SFValue, onlySelf = false): void {
    this._value = this.fallbackValue(value);
    this.updateValueAndValidity({ onlySelf });
  }

  _hasValue(): boolean {
    return this.nilValue() !== this.value;
  }

  _updateValue(): void {}

  nilValue() {
    return null;
  }

  resetValue(value: SFValue, onlySelf: boolean): void {
    if (value == null) {
      value = this.schema.default !== undefined ? this.schema.default : null;
    }
    this._value = value;

    this.updateValueAndValidity({ onlySelf });
  }
}
