import { Component, OnInit } from '@angular/core';
import { EstrategiaService } from 'src/app/services/estrategia/estrategia.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resultados-prueba',
  templateUrl: './resultados-prueba.component.html',
  styleUrls: ['./resultados-prueba.component.scss']
})
export class ResultadosPruebaComponent implements OnInit {

  logs = [];

  constructor(private estrategiaService: EstrategiaService, private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe( params  => {
      this.estrategiaService.obtenerResultados(params['idEstrategia'])
      .subscribe( (data:any) => {
        console.log(data);
        this.logs = data;
      } )
    });
    
  }

}
