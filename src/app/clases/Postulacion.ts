export class Postulacion {
    idPostulacion: number;
    idCurso: number;
    idParticipante : number;
    estado : number;

    constructor( idPostulacion:number, idCurso:number, idParticipante:number, estado: number) {
        this.idPostulacion = idPostulacion;
        this.idCurso = idCurso;
        this.idParticipante = idParticipante;
        this.estado = estado;
    }
}