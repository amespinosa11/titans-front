import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  radioHeadful = 'headful';
  apps = [];
  versions = [];
  testTypes = [];
  tools = [];
  tipoApp = '';

  Isection = {
    text: '',
    scripts: []
  }

  sections: Isection[] = []
  scripts = [];
  matriz = [];

  scriptsDefinitivos: Script[] = [];

  tipoSeleccionado = 'Headful';


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
          this.scripts = scripts.data;
        }
      });

    this.estrategiaService.obtenerMatriz(this.tipoApp)
      .subscribe((m: any) => {
        if (m.code === 200) {
          this.matriz = m.data;
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
        console.log("a " + JSON.stringify(a));

        this.scripts.forEach(script => {
          if (script.id_tipo_prueba_herramienta == test.id_tipo_prueba_herramienta) {
            console.log("script id " + script.id_tipo_prueba_herramienta);
            a.scripts.push(script);
          }
        });

        this.sections.push(a);
        this.show = true;

      }
    });

    console.log("CONTENIDO DE LAS SECCIONES" + JSON.stringify(this.sections));
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
    console.log("TOOLS" + JSON.stringify(this.tools));

    this.verificarContenido1();
  }

  setToolsChecked(tool): void {
    const index = this.testTypes.findIndex(x => x.herramienta == tool);
    if (!this.testTypes[index].isToolSelected) {
      this.testTypes[index].isToolSelected = true;
    } else {
      this.testTypes[index].isToolSelected = false;
    }
    console.log("TYPES" + JSON.stringify(this.testTypes));

    this.verificarContenido1()
  }

  seleccionarTipo(evt: any) {
    this.tipoSeleccionado = evt.target.value;
    console.log('TIPO SELECCIONADO: ', this.tipoSeleccionado);
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
        })
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
    const prueba = new Prueba(this.testTypes[0].id, this.testTypes[0], this.tipoSeleccionado,
      '', 0, 0, '2020-03-29', null, 'pendiente', 0, this.scriptsDefinitivos,
      matrizPrueba, []);
    const estrategiaEnvio = new EstrategiaEnvio(estrategia, [prueba]);
    console.log(estrategiaEnvio);
    this.estrategiaService.guardarEstrategia(estrategiaEnvio)
      .subscribe(resp => {
        console.log(resp);
        this.router.navigate(['/']);
      }, (error) => {
        console.log(error);
      })
  }
}
