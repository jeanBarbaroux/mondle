import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  clearItem(key: string) {
    localStorage.removeItem(key);
  }

  resetAtMidnight(key: string) {
    let lastTry = this.getItem('dateStarted')
    if (lastTry.length === 0) {
      this.setItem('dateStarted', new Date())
    } else {
      if (new Date().getDate() !== new Date(lastTry).getDate()) {
        this.setItem('dateStarted', new Date())
        this.clearItem(key)
      }
    }
  }
}
