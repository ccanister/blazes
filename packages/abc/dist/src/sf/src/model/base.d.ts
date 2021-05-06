export default abstract class BaseModel<T> {
    getValue(value: any): T | null;
    abstract fallbackValue(value: any): T;
}
