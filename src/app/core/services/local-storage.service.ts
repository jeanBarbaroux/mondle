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
        const now = new Date();
        const night = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1, // the next day, ...
            0, 0, 0 // ...at 00:00:00 hours
        );
        const msToMidnight = night.getTime() - now.getTime();

        setTimeout(() => {
            this.clearItem(key);
        }, msToMidnight);
    }
}
