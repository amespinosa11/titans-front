import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EstrategiaEnvio } from 'src/app/models/estrategia.model';

@Injectable({
  providedIn: 'root'
})
export class EstrategiaService {

  private env = environment;

  constructor(private http: HttpClient) { }

  guardarEstrategia(estrategia: EstrategiaEnvio) {
    return this.http.post(`${environment.endpointsUrl}/estrategias`, estrategia);
  }
}
