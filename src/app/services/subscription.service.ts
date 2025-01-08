import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public isChangeAuth = signal<boolean>(false);
  constructor() {}

  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }

  resetIsLoggedIn() {
    this.isLoggedIn.next(false);
  }

  setChangeAuth(value: boolean) {
    this.isChangeAuth.set(value);
  }
}
