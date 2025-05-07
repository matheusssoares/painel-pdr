import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private httpClient: HttpClient
  ) { 

  }

  getUsers() {
    return this.httpClient.get(`${environment.urlFirebase}getUsers`);
  }
}
