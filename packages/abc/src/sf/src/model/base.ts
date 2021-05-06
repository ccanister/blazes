export default abstract class BaseModel<T> {
  getValue(value: any) {
    if (value == null) {
      return null;
    }
    return this.fallbackValue(value);
  }
  abstract fallbackValue(value: any): T;
}
