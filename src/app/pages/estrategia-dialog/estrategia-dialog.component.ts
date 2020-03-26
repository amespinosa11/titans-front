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
  selectedApp = '';
  selectedVersion = '';
  radioHeadful= 'headful';
  apps = [
    {id: 'habweb', name: 'Habitica Web'},
    {id: 'habmov', name: 'Habitica Móvil'}
  ];
  versions: Object = {
    'habweb': ['8.5', '9.0'],
    'habmov': ['beta', 'alpha']
  };
  testTypes = [
    {id: 'E2E', isSelected: false},
    {id: 'Random', isSelected: false},
    {id: 'BDT', isSelected: false}
  ];
  tools = [
    {id: 'Cypress', isSelected: false, isDisabled: true},
    {id: 'Puppeteer', isSelected: false, isDisabled: true},
    {id: 'Cucumber', isSelected: false, isDisabled: true},
    {id: 'Calabash', isSelected: false, isDisabled: true}
  ];
  testTypesChecked = [];
  toolsChecked = [];
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

    // E2E
    const indexE2E = this.testTypesChecked.findIndex(x => x == 'E2E');
    const indexCypress = this.toolsChecked.findIndex(x => x == 'Cypress');
    const indexPuppeteer = this.toolsChecked.findIndex(x => x == 'Puppeteer');
    if (indexE2E != -1 && indexCypress != -1) {
      section = this.testTypesChecked[indexE2E] + '-' + this.toolsChecked[indexCypress];
      this.sections.push(section);
    }
    if (indexE2E != -1 && indexPuppeteer != -1) {
      section = this.testTypesChecked[indexE2E] + '-' + this.toolsChecked[indexPuppeteer];
      this.sections.push(section);
    }

    //RANDOM
    const indexRandom = this.testTypesChecked.findIndex(x => x == 'Random');
    if (indexRandom != -1) {
      this.sections.push(this.testTypesChecked[indexRandom]);
    }

    //BDT
    const indexBDT = this.testTypesChecked.findIndex(x => x == 'BDT');
    const indexCucumber = this.toolsChecked.findIndex(x => x == 'Cucumber');
    const indexCalabash = this.toolsChecked.findIndex(x => x == 'Calabash');
    if (indexBDT != -1 && indexCucumber != -1) {
      section = this.testTypesChecked[indexBDT] + '-' + this.toolsChecked[indexCucumber];
      this.sections.push(section);
    }
    if (indexBDT != -1 && indexCalabash != -1) {
      section = this.testTypesChecked[indexBDT] + '-' + this.toolsChecked[indexCalabash];
      this.sections.push(section);
    }
    console.log("CONTENIDO DE LAS SECCIONES"+ JSON.stringify(this.sections));
  }

  setTypesChecked(type): void{
    const index = this.testTypes.findIndex(x => x.id == type.id);
    this.testTypes[index].isSelected = type.isSelected;

    const indexNewArray = this.testTypesChecked.findIndex(x => x == type.id);
    if (indexNewArray != -1 && !type.isSelected) {
      this.testTypesChecked.splice(indexNewArray, 1);
    } else {
      this.testTypesChecked.push(type.id);
    }    
  }

  setToolsChecked(tool): void{
    const index = this.tools.findIndex(x => x.id == tool.id);
    this.tools[index].isSelected = tool.isSelected;

    const indexNewArray = this.toolsChecked.findIndex(x => x == tool.id);
    if (indexNewArray != -1 && !tool.isSelected) {
      this.toolsChecked.splice(indexNewArray, 1);
    } else {
      this.toolsChecked.push(tool.id);
    }    
  }

}
