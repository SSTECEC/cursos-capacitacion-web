export class Cursos {
    idCursos: number;
    nombre: string;
    descripcion_corta: string;
    descripcion_larga: string;
    icono: string;
    imagen: string;
    estado: number;
    idInstituto: number;

    constructor(nombre: string, idCursos: number, descripcion_corta: string, descripcion_larga: string, icono: string, imagen: string, estado: number, idInstituto: number) {
        this.idCursos = idCursos;
        this.nombre = nombre;
        this.descripcion_corta = descripcion_corta;
        this.descripcion_larga = descripcion_larga;
        this.icono = icono;
        this.imagen = imagen;
        this.estado = estado;
        this.idInstituto = idInstituto;
    }

}