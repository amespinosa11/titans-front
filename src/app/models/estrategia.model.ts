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

    constructor(idAplicacion: number, descripcion: string) {
        this.id_aplicacion = idAplicacion;
        this.descripcion = descripcion;
    }
}

export class Prueba {
    tipo: string;
    herramienta: string;
    modo: string;
    descripcion: string;
    cantidad_ejecuciones: number;
    id_matriz_ejecucion: number;
    fecha_ejecucion: string;
    fecha_finalizacion: string;
    estado: string;
    tiempo_ejecucion: number;
    scripts: Script[]; 
    matrizPrueba: MatrizPrueba;
    parametros: Parametro[];

    constructor(
        tipo: string,
        herramienta: string,
        modo: string,
        descripcion: string,
        cantidad_ejecuciones: number,
        id_matriz_ejecucion: number,
        fecha_ejecucion: string,
        fecha_finalizacion: string,
        estado: string,
        tiempo_ejecucion: number,
        scripts: Script[],
        matrizPrueba: MatrizPrueba,
        parametros: Parametro[]
    ) {
        this.tipo = tipo;
        this.herramienta = herramienta;
        this.modo = modo;
        this.descripcion = descripcion;
        this.cantidad_ejecuciones = cantidad_ejecuciones;
        this.id_matriz_ejecucion = id_matriz_ejecucion;
        this.fecha_ejecucion = fecha_ejecucion;
        this.fecha_finalizacion = fecha_finalizacion;
        this.estado = estado;
        this.tiempo_ejecucion = tiempo_ejecucion;
        this.scripts = scripts; 
        this.matrizPrueba = matrizPrueba;
        this.parametros = parametros;
    }
}

export class MatrizPrueba {
    navegador: string
    resolucion: string;

    constructor(navegador: string, resolucion: string) {
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