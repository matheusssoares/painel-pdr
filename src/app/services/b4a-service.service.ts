import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment';
import { B4aModelConfig } from '../models/b4a.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class B4aServiceService {
  localStorageService = inject(LocalStorageService);
  constructor(private httpClient: HttpClient) {}

  getConfig() {
    const headerOptions = {
      headers: {
        'X-Parse-Application-Id': environment.b4appApplicationId,
        'X-Parse-REST-API-Key': environment.b4appRestApiKey,
      },
    };
    return this.httpClient.get<B4aModelConfig>(
      `${environment.baseUrl}parse/classes/configProject/${environment.idProject}`,
      headerOptions
    );
  }

  getMenu() {
    const idProject = environment.idProject;
    const headerOptions = {
      headers: {
        'X-Parse-Application-Id': environment.b4appApplicationId,
        'X-Parse-REST-API-Key': environment.b4appRestApiKey,
      },
    };
    return this.httpClient.post(
      `${environment.baseUrl}parse/functions/getMenu`,
      { idProject },
      headerOptions
    );
  }

  getRaffles() {
    const headerOptions = {
      headers: {
        'X-Parse-Application-Id': environment.b4appApplicationId,
        'X-Parse-REST-API-Key': environment.b4appRestApiKey,
      },
    };
    return this.httpClient.post(
      `${environment.baseUrl}parse/functions/getRaffles`,
      {},
      headerOptions
    );
  }

  //create Raffle
  createRaffle(data: any) {
    const user = this.localStorageService.getItem('user');
    let sessionToken;
    if (user) {
      sessionToken = JSON.parse(user).sessionToken;
    }
    const headerOptions = {
      headers: {
        'X-Parse-Application-Id': environment.b4appApplicationId,
        'X-Parse-REST-API-Key': environment.b4appRestApiKey,
        'X-Parse-Session-Token': sessionToken,
      },
    };
    return this.httpClient.post(
      `${environment.baseUrl}parse/functions/createRaffle`,
      data,
      headerOptions
    );
  }
}
