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

  clearItem() {
    let itemToClear: string[] = ['countriesTried', 'countryFound', 'count', 'allCountries']
    itemToClear.forEach((item) => {
      localStorage.removeItem(item)
    })
  }

  resetAtMidnight() {
    let lastTry = this.getItem('dateStarted')
    if (lastTry.length === 0) {
      this.setItem('dateStarted', new Date())
      this.clearItem()
    } else {
      if (new Date().getDate() !== new Date(lastTry).getDate() || new Date().getMonth() !== new Date(lastTry).getMonth() || new Date().getFullYear() !== new Date(lastTry).getFullYear()) {
        this.setItem('dateStarted', new Date())
        this.clearItem()
      }
    }
  }
}
