import { AtomicProperty } from "./atomic.property";

export default class StringProperty extends AtomicProperty {
  fallbackValue(value: any): string {
    return `${value}`;
  }
}
