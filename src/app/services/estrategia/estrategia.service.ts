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

  obtenerAplicaciones() {
    return this.http.get(`${environment.endpointsUrl}/testingTool/getApplications`);
  }

  obtenerTiposPruebaYherramientas(tipoApp) {
    return this.http.get(`${environment.endpointsUrl}/testingTool/getTestsAndTools/${tipoApp}`);
  }

  obtenerScriptsDisponibles() {
    console.log(`${environment.endpointsUrl}/testingTool/getAllScripts`);
    return this.http.get(`${environment.endpointsUrl}/testingTool/getAllScripts`);
  }

  obtenerMatriz(tipoApp) {
    return this.http.get(`${environment.endpointsUrl}/testingTool/getBrowserMatrices/${tipoApp}`);
  }

  guardarEstrategia(estrategia: EstrategiaEnvio) {
    return this.http.post(`${environment.endpointsUrl}/estrategias`, estrategia);
  }
}
