import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { B4aModel } from '../models/b4a.model';

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
    return this.httpClient.get<B4aModel>(`${environment.baseUrl}parse/classes/configProject/${environment.idProject}`, headerOptions);
  }
}
