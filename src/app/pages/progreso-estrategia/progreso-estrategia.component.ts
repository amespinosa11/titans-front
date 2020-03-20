import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progreso-estrategia',
  templateUrl: './progreso-estrategia.component.html',
  styleUrls: ['./progreso-estrategia.component.scss']
})
export class ProgresoEstrategiaComponent implements OnInit {

  pruebas = [
    {
      script: 'Prueba login',
      cantidadEjecuciones: 20,
      estado: 'En proceso',
      finalizado: false
    },
    {
      script: 'Prueba Registro',
      cantidadEjecuciones: 5,
      estado: 'Pendiente',
      finalizado: false
    },
    {
      script: 'Prueba registrar habito',
      cantidadEjecuciones: 45,
      estado: 'En cola',
      finalizado: false
    },
    {
      script: 'Prueba logout',
      cantidadEjecuciones: 4,
      estado: 'Terminado',
      finalizado: true
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
