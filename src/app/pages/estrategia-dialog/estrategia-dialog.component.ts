import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AgregarScriptDialogComponent } from '../agregar-script-dialog/agregar-script-dialog.component';
import { Script } from 'src/app/models/script.model';
import { EstrategiaEnvio, MatrizPrueba, Estrategia, Prueba } from 'src/app/models/estrategia.model';
import { EstrategiaService } from 'src/app/services/estrategia/estrategia.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-estrategia-dialog',
  templateUrl: './estrategia-dialog.component.html',
  styleUrls: ['./estrategia-dialog.component.scss']
})
export class EstrategiaDialogComponent implements OnInit {

  contenido1Valido = false;
  nombreEstartegia = '';
  show: boolean = false;
  selectedApp = 0; // Este se utiliza para obtener la aplicacion
  selectedVersion = '';
  radioHeadful = 'headful';
  apps = [];
  versions = [];
  testTypes = [];
  tools = [];
  tipoApp = '';

  sections = []
  scripts = [];
  matriz = [];
  navegadores = [];
  resoluciones = [];

  scriptsDefinitivos = {};

  tipoSeleccionado = 'Headful';

  matrizPorHerramienta = {};
  
  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog, private estrategiaService: EstrategiaService,
    private router: Router) { }

  ngOnInit() {
    this.estrategiaService.obtenerAplicaciones()
      .subscribe((apps: any) => {
        if (apps.code === 200) {
          this.apps = apps.data;
        }
      });

    this.estrategiaService.obtenerScriptsDisponibles()
      .subscribe((scripts: any) => {
        if (scripts.code === 200) {
          this.scripts = scripts.data.map(script => {
            script.selected = false;
            return script;
          });
        }
      });
  }

  close(): void {
    this.dialogRef.close();
  }

  openSections(): void {
    this.testTypes.forEach(test => {
      if ((test.isTestSelected && test.isToolSelected)) {
        let a = {
          text: test.tipo_prueba + '-' + test.herramienta,
          scripts: []
        };

        this.scripts.forEach(script => {
          if (script.id_tipo_prueba_herramienta == test.id_tipo_prueba_herramienta) {
            a.scripts.push(script);
          }
        });

        this.sections.push(a);

        //llenar navegadores y resoluciones
        this.matriz.forEach(mat => {
          const indexNavegador = this.navegadores.findIndex(x => x == mat.navegador);
          const indexResolucion = this.resoluciones.findIndex(x => x == mat.resolucion);

          if (indexNavegador == -1) {
            this.navegadores.push(mat.navegador);
          }

          if (indexResolucion == -1) {
            if(this.resoluciones.indexOf(mat.resolucion.toLowerCase()) === -1) this.resoluciones.push(mat.resolucion)
          }
        });

        this.show = true;
      }
    });

  }

  setTypesChecked(type): void {
    const index = this.testTypes.findIndex(x => x.id_tipo_prueba_herramienta == type.id_tipo_prueba_herramienta);
    const indexTool = this.tools.findIndex(x => x == type.herramienta);
    this.testTypes[index].isTestSelected = type.isTestSelected;
    if (type.tipo_prueba == 'RANDOM') {
      this.testTypes[index].isToolSelected = type.isTestSelected;
    }

    if (type.tipo_prueba != 'RANDOM' && type.isTestSelected && indexTool == -1 && this.testTypes[index].herramienta != null) {
      this.tools.push(type.herramienta);
    } else if (type.tipo_prueba != 'RANDOM' && !type.isTestSelected && indexTool != -1) {
      this.tools.splice(indexTool, 1);
    }

    this.verificarContenido1();
  }

  setToolsChecked(tool): void {
    const index = this.testTypes.findIndex(x => x.herramienta == tool);
    if (!this.testTypes[index].isToolSelected) {
      this.testTypes[index].isToolSelected = true;
    } else {
      this.testTypes[index].isToolSelected = false;
    }

    this.verificarContenido1()
  }

  seleccionarTipo(evt: any) {
    this.tipoSeleccionado = evt.target.value;
  }

  verificarContenido1() {
    if (this.nombreEstartegia.length > 4 && this.selectedApp > 0
      && this.selectedVersion.length > 0 && this.tools.length > 0
    ) {
      this.contenido1Valido = true;
    } else {
      this.contenido1Valido = false;
    }
  }

  llenarVersionesYherramientas() {
    if (this.selectedApp > 0) {
      const index = this.apps.findIndex(x => x.id_aplicacion == this.selectedApp);
      this.versions = this.apps[index].versions;
      this.tipoApp = this.apps[index].tipo;
      this.estrategiaService.obtenerTiposPruebaYherramientas(this.tipoApp)
        .subscribe((pruebas_herramientas: any) => {
          if (pruebas_herramientas.code === 200) {
            this.testTypes = pruebas_herramientas.data;
            this.testTypes.forEach(test => {
              test.isTestSelected = false;
              test.isToolSelected = false;
            });
          }
        });

      this.estrategiaService.obtenerMatriz(this.tipoApp)
        .subscribe((m: any) => {
          if (m.code === 200) {
            this.matriz = m.data;
          }
        });
    }
  }

  openScriptModal(section) {
    let idTipoPruebaHerramienta = 0;
    for(let test of this.testTypes) {
      if(section.text === `${test.tipo_prueba}-${test.herramienta}`) {
        idTipoPruebaHerramienta = test.id_tipo_prueba_herramienta;
      }
    }
    const dialogRef = this.dialog.open(AgregarScriptDialogComponent, {
      width: '60%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      const result2 = {
        cant_ejecuciones : result.cantEjecuciones < 0 ? 1 : result.cantEjecuciones,
        descripcion: result.descripcion.split(' ').join(''),
        script_file: result.scriptFile,
        id_tipo_prueba_herramienta: idTipoPruebaHerramienta,
        selected : false
      }
      this.scripts.push(result2);
      section.scripts.push(result2);
    });
  }

  onScriptChange(event) {
  }

  setScriptsChecked(script: any) {
    this.scripts.forEach(s => {
      if (s.id_script === script.id_script) {
        s.selected = !s.selected;
      }
    });
  }

  setNavegador1(tool,navegador,num) {
    for (let prueba of this.testTypes) {
      if(`${prueba.tipo_prueba}-${prueba.herramienta}` === tool.text) {
        if(this.matrizPorHerramienta[prueba.id_tipo_prueba_herramienta] !== undefined) {
          let obj;
          for(let navegadorP of this.matrizPorHerramienta[prueba.id_tipo_prueba_herramienta]) {
            if(navegadorP.navegador === navegador) {
              navegadorP[num] = navegadorP[num] !== undefined ? !navegadorP[num] : true;
            } else {
              obj = {
                navegador : navegador
              }
              obj[num] = true;
              
            }
          }

          if(obj !== undefined && this.matrizPorHerramienta[prueba.id_tipo_prueba_herramienta].length < 2) {
            this.matrizPorHerramienta[prueba.id_tipo_prueba_herramienta].push(obj)
            obj = undefined;
          }
        }
        else {
          let obj = {
            navegador : navegador
          }
          obj[num] = true;
          this.matrizPorHerramienta[prueba.id_tipo_prueba_herramienta] = [];
          this.matrizPorHerramienta[prueba.id_tipo_prueba_herramienta].push(obj);
        }
      }
    }
  }

  guardarPrueba() {
    // Organizar la estrategia
    let estrategia = new Estrategia(this.selectedApp, this.nombreEstartegia, []);
    let pruebas: Prueba[] = [];
    // Organizar las pruebas
    for (let prueba of this.testTypes) {
      if (prueba.isTestSelected && prueba.isToolSelected) {
        // Obtener los scripts para la prueba
        let scriptsDefinitivos = this.scripts.map(script => {
          if (script.id_tipo_prueba_herramienta === prueba.id_tipo_prueba_herramienta && script.selected) {
            return new Script(parseInt(script.cant_ejecuciones), script.descripcion, script.script_file, script.id_tipo_prueba_herramienta);
          }
        }).filter(resp => resp !== undefined);
        let matricesSeleccionadas = [];
        // Obtener las matrices de prueba.
        for(let matriz of this.matrizPorHerramienta[prueba.id_tipo_prueba_herramienta]) {
          if(matriz['0'] !== undefined && matriz['0']) {
            matricesSeleccionadas.push(new MatrizPrueba(prueba.tipo_aplicacion, matriz.navegador, '1024 X 768'));
          }
          if(matriz['1'] !== undefined && matriz['1']) {
            matricesSeleccionadas.push(new MatrizPrueba(prueba.tipo_aplicacion, matriz.navegador, '1366 X 768'));
          }
        }

        let nuevaPrueba = new Prueba(this.tipoSeleccionado, '', 0, moment().format('YYYY-MM-DD HH:mm:ss'), null, 'pendiente', 0, prueba.id_tipo_prueba_herramienta,
          scriptsDefinitivos, matricesSeleccionadas, []);
        nuevaPrueba.cantidad_ejecuciones = scriptsDefinitivos.length > 0 ? 0 : 1;
        pruebas.push(nuevaPrueba);
      }
    }

    estrategia.pruebas = pruebas;

    this.estrategiaService.guardarEstrategia(estrategia)
      .subscribe(resp => {
        console.log(resp);
        this.dialogRef.close();
        this.router.navigate(['/']);
      }, (error) => {
        console.log(error);
      })
  }
}
