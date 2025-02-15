import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class B4aServiceService {
  localStorageService = inject(LocalStorageService);
  constructor(private httpClient: HttpClient) {}

  getConfig(data: any) {
    console.log(data);
    
    const headerOptions = {
      headers: {
        'X-Parse-Application-Id': environment.b4appApplicationId,
        'X-Parse-REST-API-Key': environment.b4appRestApiKey,
      },
    };

    return this.httpClient.post(
      `${environment.baseUrl}parse/functions/getConfigProject`,
      data,
      headerOptions
    )
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

  //get comunicados
  getAlerts() {
    const headerOptions = {
      headers: {
        'X-Parse-Application-Id': environment.b4appApplicationId,
        'X-Parse-REST-API-Key': environment.b4appRestApiKey,
      },
    };
    return this.httpClient.post(
      `${environment.baseUrl}parse/functions/getAlerts`,
      {},
      headerOptions
    );
  }

  //create Raffle
  createRaffle(data: any, action: 'create' | 'update') {
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

    let url = action === 'create' ? 'createRaffle' : 'updateRaffle';
    return this.httpClient.post(
      `${environment.baseUrl}parse/functions/${url}`,
      data,
      headerOptions
    );
  }

  deleteRaffle(data: any) {
    const headerOptions = {
      headers: {
        'X-Parse-Application-Id': environment.b4appApplicationId,
        'X-Parse-REST-API-Key': environment.b4appRestApiKey
      },
    };
    return this.httpClient.post(
      `${environment.baseUrl}parse/functions/deleteRaffle`,
      data,
      headerOptions
    );
  }

  actionAlert(data: any, action: 'create' | 'update' ) {
    const headerOptions = {
      headers: {
        'X-Parse-Application-Id': environment.b4appApplicationId,
        'X-Parse-REST-API-Key': environment.b4appRestApiKey
      },
    };

    let url = action === 'create' ? 'createAlert' : 'updateAlert';
    return this.httpClient.post(
      `${environment.baseUrl}parse/functions/${url}`,
      data,
      headerOptions
    );
  }

  deleteAlert(data: any) {
    const headerOptions = {
      headers: {
        'X-Parse-Application-Id': environment.b4appApplicationId,
        'X-Parse-REST-API-Key': environment.b4appRestApiKey
      },
    };
    return this.httpClient.post(
      `${environment.baseUrl}parse/functions/deleteAlert`,
      data,
      headerOptions
    );
  }

  getSupport() {
    const headerOptions = {
      headers: {
        'X-Parse-Application-Id': environment.b4appApplicationId,
        'X-Parse-REST-API-Key': environment.b4appRestApiKey
      },
    };
    return this.httpClient.post(
      `${environment.baseUrl}parse/functions/getTicketsByUserId`,
      {getAll: true},
      headerOptions
    );
  }

  updateSupport(data: any) {
    const headerOptions = {
      headers: {
        'X-Parse-Application-Id': environment.b4appApplicationId,
        'X-Parse-REST-API-Key': environment.b4appRestApiKey
      },
    }

    return this.httpClient.post(
      `${environment.baseUrl}parse/functions/updateSupportTicket`,
      data,
      headerOptions
    )
  }

  deleteSupport(data: any) {
    const headerOptions = {
      headers: {
        'X-Parse-Application-Id': environment.b4appApplicationId,
        'X-Parse-REST-API-Key': environment.b4appRestApiKey
      },
    }
    return this.httpClient.post(
      `${environment.baseUrl}parse/functions/deleteSupportTicket`,
      data,
      headerOptions
    )
  }
}
