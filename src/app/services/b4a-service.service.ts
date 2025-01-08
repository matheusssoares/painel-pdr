import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { B4aModelConfig } from '../models/b4a.model';

@Injectable({
  providedIn: 'root'
})
export class B4aServiceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getConfig() {
    const headerOptions = {
      headers: {
        'X-Parse-Application-Id': environment.b4appApplicationId,
        'X-Parse-REST-API-Key': environment.b4appRestApiKey
      }
    }
    return this.httpClient.get<B4aModelConfig>(`${environment.baseUrl}parse/classes/configProject/${environment.idProject}`, headerOptions);
  }

  getMenu() {
    const idProject = environment.idProject;
    const headerOptions = {
      headers: {
        'X-Parse-Application-Id': environment.b4appApplicationId,
        'X-Parse-REST-API-Key': environment.b4appRestApiKey
      }
    }
    return this.httpClient.post(`${environment.baseUrl}parse/functions/getMenu`, {idProject}, headerOptions);
  }
}
