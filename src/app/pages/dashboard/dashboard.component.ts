import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { MatDialog } from '@angular/material';
import { EstrategiaDialogComponent } from '../estrategia-dialog/estrategia-dialog.component';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  estadisticas: any;
  estrategiasGenerales = [];

  constructor(public estrategiaDialog: MatDialog, private dashboardService: DashboardService) {
    this.estadisticas = {
      totales: 1,
      pendientes: 1,
      enCola: 0,
      enEjecucion: 0,
      fallidas: 0,
      satisfactorias: 0
    }
  }

  ngOnInit() {
    this.dashboardService.obtenerEstadisticas()
      .subscribe( (estadisticas:any) => {
        if(estadisticas.code === 200) {
          this.estadisticas = estadisticas.data;
        }
      })

    this.dashboardService.obtenerEstrategiasGeneral()
      .subscribe( (estrategias: any) => {
        this.estrategiasGenerales = estrategias;
        console.log(estrategias);
      });
  }

  openDialog(): void {
    const dialogRef = this.estrategiaDialog.open(EstrategiaDialogComponent, {
      width: '900vw',
      height: '150vw',
      maxWidth: '100%',
      data: [0,1]
    });

    dialogRef.afterClosed().subscribe(result => {
      // Aca se contrala la acción al cerrar el modal
    });
  }

}
