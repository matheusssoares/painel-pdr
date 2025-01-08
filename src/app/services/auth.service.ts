import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router
} from '@angular/router';
import { environment } from '../environment';
import { UserModel } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  /* canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(async (resolve) => {
      const getData = this.getCurrentUserApi();  
      if (getData) {
        resolve(true);
      } else {
        this.router.navigate(['login']);
      }
    });
  } */
  login(email: string, password: string) {
    const headerOptions = {
      headers: {
        'X-Parse-Application-Id': environment.b4appApplicationId,
        'X-Parse-REST-API-Key': environment.b4appRestApiKey,
      },
    };
    const body = { email, password };
    return this.httpClient.post<UserModel>(
      `${environment.baseUrl}parse/functions/login`,
      body,
      headerOptions
    );
  }

  getCurrentUser(): boolean {
    const user = this.localStorageService.getItem('user');
    if (user === null) {
      return false;
    }
    return !!JSON.parse(user);
  }

  logout() {
    const headers = {
      'X-Parse-Application-Id': environment.b4appApplicationId,
      'X-Parse-REST-API-Key': environment.b4appRestApiKey,
    };

    return this.httpClient.post(
      `${environment.baseUrl}parse/functions/logout`,
      {}, // O corpo da requisição deve ser vazio para logout
      { headers } // Headers são passados como o terceiro argumento
    );
  }

 async getCurrentUserApi(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const user = this.localStorageService.getItem('user');
      let sessionToken;
      if (user) {
        sessionToken = JSON.parse(user).sessionToken;
      }
      if (!sessionToken) {
        resolve(false);
      } else {
        const headers = {
          'X-Parse-Application-Id': environment.b4appApplicationId,
          'X-Parse-REST-API-Key': environment.b4appRestApiKey,
          'X-Parse-Session-Token': sessionToken,
        };

        this.httpClient
          .post<UserModel>(
            `${environment.baseUrl}parse/functions/getCurrentUser`,
            {},
            { headers }
          )
          .subscribe(
            (res) => {
              resolve(!!res);
            },
            (error) => {
              reject(error);
              resolve(false);
            }
          );
      }
    });
  }
}
