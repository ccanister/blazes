import { AtomicProperty } from "./atomic.property";

export class BooleanProperty extends AtomicProperty {
  fallbackValue(value: any): boolean {
    return !!value;
  }
}
