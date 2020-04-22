import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AgregarScriptDialogComponent } from '../agregar-script-dialog/agregar-script-dialog.component';
import { Script } from 'src/app/models/script.model';
import { EstrategiaEnvio, MatrizPrueba, Estrategia, Prueba } from 'src/app/models/estrategia.model';
import { EstrategiaService } from 'src/app/services/estrategia/estrategia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estrategia-dialog',
  templateUrl: './estrategia-dialog.component.html',
  styleUrls: ['./estrategia-dialog.component.scss']
})
export class EstrategiaDialogComponent implements OnInit {

  contenido1Valido = false;
  nombreEstartegia = '';
  show: boolean = false;
  selectedApp = 0;
  selectedVersion = '';
  radioHeadful= 'headful';
  apps = [
    {id: 1, name: 'Habitica Web'},
    {id: 2, name: 'Habitica Móvil'}
  ];
  versions: Object = {
    1: ['8.5', '9.0'],
    2: ['beta', 'alpha']
  };
  testTypes = [
    {
      id: 'E2E', 
      isSelected: false,
      tools: [
        {id: 'Cypress', isSelected: false, isDisabled: true},
      ]
    },
    {
      id: 'Random', 
      isSelected: false,
      tools: [
        {id: 'Cypress', isSelected: false, isDisabled: true},
        {id: 'Calabash', isSelected: false, isDisabled: true}
      ]
    },
    {
      id: 'BDT', 
      isSelected: false, 
      tools: [

      ]
    }
  ];
  tools = [
    //{id: 'Cypress', isSelected: false, isDisabled: true},
    //{id: 'Puppeteer', isSelected: false, isDisabled: true},
    //{id: 'Cucumber', isSelected: false, isDisabled: true},
    //{id: 'Calabash', isSelected: false, isDisabled: true}
  ];
  testTypesChecked = [];
  toolsChecked = [];
  sections = [];
  scripts : any[] = [
    {descripcion: 'Prueba login', cant_ejecuciones: '30'},
    {descripcion: 'Prueba registro', cant_ejecuciones: '50'}
  ];

  scriptsDefinitivos: Script[] = [];

  tipoSeleccionado = 'Headful';
    

  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog, private estrategiaService: EstrategiaService,
    private router: Router) { }
  
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

  setTypesChecked(type): void {
    const index = this.testTypes.findIndex(x => x.id == type.id);
    this.testTypes[index].isSelected = type.isSelected;
    this.tools = [];
    this.testTypes.forEach( test => {
      if(test.isSelected) {
        this.tools =  this.tools.concat(test.tools);
      }
    });
    console.log(this.tools);

    const indexNewArray = this.testTypesChecked.findIndex(x => x == type.id);
    if (indexNewArray != -1 && !type.isSelected) {
      this.testTypesChecked.splice(indexNewArray, 1);
    } else {
      this.testTypesChecked.push(type.id);
    }
    this.verificarContenido1();    
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
    this.verificarContenido1()    
  }

  seleccionarTipo(evt: any) {
    this.tipoSeleccionado = evt.target.value;
    console.log('TIPO SELECCIONADO: ', this.tipoSeleccionado);
  }

  verificarContenido1() {
    if(this.nombreEstartegia.length > 4 && this.selectedApp > 0 
      && this.selectedVersion.length > 0 && this.testTypesChecked.length > 0
      && this.toolsChecked.length > 0
      ) {
        this.contenido1Valido = true;
      } else {
        this.contenido1Valido = false;
      }
  }

  openScriptModal() {
    const dialogRef = this.dialog.open(AgregarScriptDialogComponent, {
      width: '50%',
      height: '65%'
    });

    dialogRef.afterClosed().subscribe(result => {
      const result2 = new Script(result.cantEjecuciones, '', result.scriptFile);
      this.scriptsDefinitivos.push(result2);
      this.scripts.push(result2);
      console.log('The dialog was closed', result);
    });
  }

  onScriptChange(event) {
    console.log('EVENT :', event);
  }

  guardarPrueba() {
    const matrizPrueba = new MatrizPrueba('chrome', '1028');
    const estrategia = new Estrategia(this.selectedApp, this.nombreEstartegia);
    const prueba =  new Prueba(this.testTypes[0].id, this.toolsChecked[0],this.tipoSeleccionado,
      '', 0, 0, '2020-03-29', null, 'pendiente', 0, this.scriptsDefinitivos,
      matrizPrueba, []);
    const estrategiaEnvio = new EstrategiaEnvio(estrategia,[prueba]);
    console.log(estrategiaEnvio);
    this.estrategiaService.guardarEstrategia(estrategiaEnvio)
      .subscribe( resp => {
        console.log(resp);
        this.router.navigate(['/']);
      }, (error) => { 
        console.log(error);
      })
  }
}
