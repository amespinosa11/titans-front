import { Script } from "./script.model";

export class EstrategiaEnvio {
    estrategia: Estrategia;
    pruebas: Prueba[];
    
    constructor(estrategia: Estrategia, pruebas: Prueba[]) {
        this.estrategia = estrategia;
        this.pruebas = pruebas;
    }
}

export class Estrategia {
    id_aplicacion: number;
    descripcion: string;
    pruebas: Prueba[];

    constructor(idAplicacion: number, descripcion: string, pruebas: Prueba[]) {
        this.id_aplicacion = idAplicacion;
        this.descripcion = descripcion;
        this.pruebas = pruebas;
    }
}

export class Prueba {
    modo: string;
    descripcion: string;
    cantidad_ejecuciones: number;
    fecha_ejecucion: string;
    fecha_finalizacion: string;
    estado: string;
    tiempo_ejecucion: number;
    id_tipo_herramienta_prueba: number;
    scripts: Script[]; 
    matrizPrueba: MatrizPrueba[];
    parametros: Parametro[];

    constructor(
        modo: string,
        descripcion: string,
        cantidad_ejecuciones: number,
        fecha_ejecucion: string,
        fecha_finalizacion: string,
        estado: string,
        tiempo_ejecucion: number,
        id_tipo_herramienta_prueba: number,
        scripts: Script[],
        matrizPrueba: MatrizPrueba[],
        parametros: Parametro[],
    ) {
        this.modo =  modo;
        this.descripcion = descripcion;
        this.cantidad_ejecuciones = cantidad_ejecuciones;
        this.fecha_ejecucion = fecha_ejecucion;
        this.fecha_finalizacion = fecha_finalizacion;
        this.estado = estado;
        this.tiempo_ejecucion = tiempo_ejecucion
        this.id_tipo_herramienta_prueba = id_tipo_herramienta_prueba;
        this.scripts = scripts;
        this.matrizPrueba = matrizPrueba;
        this.parametros = parametros;
    }
}

export class MatrizPrueba {
    tipo_aplicacion: string;
    navegador: string;
    resolucion: string;

    constructor(tipo_aplicacion: string, navegador: string, resolucion: string) {
        this.tipo_aplicacion = tipo_aplicacion;
        this.navegador = navegador;
        this.resolucion = resolucion;
    }
}

export class Parametro {
    parametro: string;

    constructor(parametro: string) {
        this.parametro = parametro;
    }
}