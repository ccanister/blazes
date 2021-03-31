export class ArrayService {
  static arrIsEmpty(arr: Array<any> | undefined): boolean {
    return arr == null || (Array.isArray(arr) && arr.length === 0);
  }

  static getLast<T>(arr: T[]): T | undefined {
    return arr[arr.length - 1];
  }
}
