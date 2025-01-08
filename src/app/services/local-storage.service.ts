import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: any) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  }

  getItem(key: string) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(key);
      }
      // Add a return statement here
      return null;
    } catch (error) {
      console.log(error);
      // Add a return statement here
      return null;
    }
  }

  removeItem(key: string) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.removeItem(key);
      }
    } catch (error) {
      console.log(error);
    }
  }

  clear() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
