import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private auth = inject(AuthService);

  public isChangeAuth = signal<boolean>(false);
  constructor() {}

  /* getIsLoggedIn(): BehaviorSubject<boolean> {
    console.log(this.isChangeAuth());
    
    return this.isLoggedIn;
  } */

  async getIsLoggedIn() {
    const userLogged =  await this.auth.getCurrentUserApi();
    this.setChangeAuth(userLogged);    
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
