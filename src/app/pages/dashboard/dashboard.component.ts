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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public estrategiaDialog: MatDialog) { }

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.estrategiaDialog.open(EstrategiaDialogComponent, {
      width: '900vw',
      height: '150vw',
      maxWidth: '100%',
      data: {name: 'Ejemplo'}
    });

    dialogRef.afterClosed().subscribe(result => {
      // Aca se contrala la acción al cerrar el modal
    });
  }

}
