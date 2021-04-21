export class Archivo {
    idInstituto: number;
    nombre: string;
    documento : string;
    idParticipante : number;

    constructor(nombre: string, idInstituto:number, documento:string, idParticipante: number) {
        this.idInstituto = idInstituto;
        this.nombre = nombre;
        this.documento = documento;
        this.idParticipante = idParticipante;
    }
}