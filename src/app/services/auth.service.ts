import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
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
  canActivate(
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
  }
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

  getCurrentUserApi(): boolean {
    const user = this.localStorageService.getItem('user');
    let sessionToken;
    if(user) {
      sessionToken = JSON.parse(user).sessionToken;
    }
    const headers = {
      'X-Parse-Application-Id': environment.b4appApplicationId,
      'X-Parse-REST-API-Key': environment.b4appRestApiKey,
      'X-Parse-Session-Token': sessionToken,
    };
    let result = false;
    this.httpClient.post<UserModel>(
      `${environment.baseUrl}parse/functions/getCurrentUser`,
      {},
      {headers}
    ).subscribe((res) => {
      result = true;
    }, (error) => {
      result = false;
    });
    return result;
  }
}
