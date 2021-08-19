import { AtomicProperty } from "./atomic.property";

export class StringProperty extends AtomicProperty {
  fallbackValue(value: any): string {
    return `${value}`;
  }
}
