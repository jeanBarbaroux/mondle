import {BehaviorSubject} from "rxjs";

export class LocalStorageSubject<T> extends BehaviorSubject<T> {
  constructor(private storageKey: string, private defaultValue: T, listenToChange = false) {
    const storageValue = localStorage.getItem(storageKey)
    const value: T = storageValue !== null ? JSON.parse(storageValue) : defaultValue
    if (listenToChange) {
      window.addEventListener("storage", () => {
        const storageValue = localStorage.getItem(storageKey)
        if (storageValue !== null) {
          const value: T = JSON.parse(storageValue)
          this.next(value)
        }
      });
    }
    if (storageValue === null) {
      localStorage.setItem(storageKey, JSON.stringify(value))
    }
    super(value)
  }

  override next(value: T) {
    localStorage.setItem(this.storageKey, JSON.stringify(value))
    super.next(value);
  }

  resetToDefault = () => {
    this.next(this.defaultValue)
  }
}
