import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-estrategia-dialog',
  templateUrl: './estrategia-dialog.component.html',
  styleUrls: ['./estrategia-dialog.component.scss']
})
export class EstrategiaDialogComponent implements OnInit {

  show: boolean = false;
  apps = [
    {id: 'habweb', name: 'Habitica Web'},
    {id: 'habmov', name: 'Habitica Móvil'}
  ];
  versionsWeb: [{id: '8.5'},{id: '9.0'}];
  versionsMovil: [{id: 'beta'},{id: 'alpha'}];
  testTypes = ['E2E', 'Random', 'BDT'];
  tools = ['Cypress', 'Puppeteer', 'Cucumber', 'Calabash'];
  testTypesChecked = ['E2E', 'Random', 'BDT'];
  toolsChecked = ['Cypress', 'Puppeteer', 'Cucumber', 'Calabash'];
  sections = [];
  scripts = [
    {id:1, name: 'Prueba login', cant: '30'},
    {id:2, name: 'Prueba registro', cant: '50'}
  ];
    

  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  
  ngOnInit() {
    console.log('ESTE ES EL CONTENIDO QUE VIENE : ', this.data);
  }

  close(): void {
    this.dialogRef.close();
  }

  openSections(): void {
    this.show = true;
    let section = '';
    for (let i = 0; i < this.testTypesChecked.length; i++) {
      if (this.testTypesChecked[i] == 'E2E') {
        for (let j = 0; j < this.toolsChecked.length; j++) {
          if (this.toolsChecked[j] == 'Cypress' || this.toolsChecked[j] == 'Puppeteer') {
            section = this.testTypesChecked[i] + '-' + this.toolsChecked[j];
            this.sections.push(section);
          }
        }
      }
      if (this.testTypesChecked[i] == 'Random') {
        section = this.testTypesChecked[i];
        this.sections.push(section);
      }
      if (this.testTypesChecked[i] == 'BDT') {
        for (let j = 0; j < this.toolsChecked.length; j++) {
          if (this.toolsChecked[j] == 'Cucumber' || this.toolsChecked[j] == 'Calabash') {
            section = this.testTypesChecked[i] + '-' + this.toolsChecked[j];
            this.sections.push(section);
          }
        }
      }
    }
    console.log("CONTENIDO DE LAS SECCIONES"+ JSON.stringify(this.sections));
  }

  openScriptModal(){
    
  }

}
