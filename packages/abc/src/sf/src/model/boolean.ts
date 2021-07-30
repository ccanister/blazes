import { AtomicProperty } from "./atomic.property";

export default class BooleanProperty extends AtomicProperty {
  fallbackValue(value: any): boolean {
    return !!value;
  }
}
