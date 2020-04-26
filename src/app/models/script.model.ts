export class Script {
    cant_ejecuciones:number;
    descripcion:string;
    script_file: any;
    id_tipo_herramienta_prueba: number;

    constructor(cantidadEjecuciones: number, descripcion: string, scriptFile: any, 
        id_tipo_herramienta_prueba: number) {
        this.cant_ejecuciones = cantidadEjecuciones;
        this.descripcion = descripcion;
        this.script_file = scriptFile;
        this.id_tipo_herramienta_prueba = id_tipo_herramienta_prueba;
    }

}