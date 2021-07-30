import { AtomicProperty } from "./atomic.property";

export default class AnyProperty extends AtomicProperty {
  fallbackValue(value: any): any {
    return value;
  }
}
