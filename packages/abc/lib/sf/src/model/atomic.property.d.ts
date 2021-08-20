import { SFValue } from "../type";
import { FormProperty } from "./form.property";
export declare abstract class AtomicProperty extends FormProperty {
    abstract fallbackValue(value: SFValue): SFValue;
    setValue(value: SFValue, onlySelf?: boolean): void;
    _hasValue(): boolean;
    _updateValue(): void;
    nilValue(): null;
    resetValue(value: SFValue, onlySelf: boolean): void;
}
