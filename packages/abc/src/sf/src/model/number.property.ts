import { AtomicProperty } from "./atomic.property";

export class NumberProperty extends AtomicProperty {
  fallbackValue(value: any): number | null {
    if (typeof value === "string") {
      return value.length > 0 ? +value : null;
    }
    return +value;
  }
}
