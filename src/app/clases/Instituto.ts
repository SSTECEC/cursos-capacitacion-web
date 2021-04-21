export class Instituto {
    idInstituto: number;
    nombre: string;
    imagen : string;
    estado : number;

    constructor(nombre: string, idInstituto:number, imagen:string, estado: number) {
        this.idInstituto = idInstituto;
        this.nombre = nombre;
        this.imagen = imagen;
        this.estado = estado;
    }
}