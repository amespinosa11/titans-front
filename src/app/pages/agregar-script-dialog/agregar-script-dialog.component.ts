import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-agregar-script-dialog',
  templateUrl: './agregar-script-dialog.component.html',
  styleUrls: ['./agregar-script-dialog.component.scss']
})
export class AgregarScriptDialogComponent implements OnInit {

  scriptData: any;

  constructor(
    public dialogRef: MatDialogRef<AgregarScriptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.scriptData = {
      cantEjecuciones: 0,
      scriptFile: null,
      descripcion: ''
    }
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.scriptData.scriptFile =  reader.result;
        };
    }
  }

  cerrar() {
    this.dialogRef.close();
  }

}
