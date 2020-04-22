export class Script {
    cant_ejecuciones:number;
    descripcion:string;
    script_file: any;

    constructor(cantidadEjecuciones: number, descripcion: string, scriptFile: any) {
        this.cant_ejecuciones = cantidadEjecuciones;
        this.descripcion = descripcion;
        this.script_file = scriptFile;
    }

}