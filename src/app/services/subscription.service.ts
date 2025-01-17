import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public updateTemplate: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  private auth = inject(AuthService);

  public isChangeAuth = signal<boolean>(false);
  constructor(private router: Router) {}

  async getIsLoggedIn() {
    const userLogged = await this.auth.getCurrentUserApi();
    this.setChangeAuth(userLogged);
    if (!userLogged) {
      this.router.navigate(['login']);
    }
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

  setUpdateTemplate(value: string) {
    this.updateTemplate.next(value);
  } 

  getUpdateTemplate() {
    return this.updateTemplate.asObservable();
  }
}
