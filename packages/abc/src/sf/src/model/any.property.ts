import { AtomicProperty } from "./atomic.property";

export class AnyProperty extends AtomicProperty {
  fallbackValue(value: any): any {
    return value;
  }
}
