import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-estrategia-dialog',
  templateUrl: './estrategia-dialog.component.html',
  styleUrls: ['./estrategia-dialog.component.scss']
})
export class EstrategiaDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  
  ngOnInit() {
    console.log('ESTE ES EL CONTENIDO QUE VIENE : ', this.data);
  }

  close(): void {
    this.dialogRef.close();
  }

}
