import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private env = environment;

  constructor(private http: HttpClient) { }

  obtenerEstadisticas() {
    return this.http.get(`${environment.endpointsUrl}/estrategias/estadisticas`);
  }

  obtenerEstrategiasGeneral() {
    return this.http.get(`${environment.endpointsUrl}/estrategias/estragias_general`);
  }

}
