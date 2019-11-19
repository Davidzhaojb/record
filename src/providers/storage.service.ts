import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor() { }

    write(key: string, value: any) {
        if (value) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }
    writeString(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    read<T>(key: string): T {
        const value: string = localStorage.getItem(key);
        if (value && value !== 'undefined' && value !== 'null') {
            return <T>JSON.parse(value);
        }

        return null;
    }

    readString(key: string): string {
        return localStorage.getItem(key);
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    exist(key: string) {
        return !!localStorage.getItem(key);
    }

    clear() {
        localStorage.clear();
    }

    // 本地存储
    public localStorageGet(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }

    public localStorageSet(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
