export class Postulacion {
    idPostulacion: number;
    idCurso: number;
    idParticipante : number;
    estado : number;
    nombre_curso: string;
    nombre_participante: string;

    constructor( idPostulacion:number, idCurso:number, idParticipante:number, estado: number, nombre_curso: string, nombre_participante: string) {
        this.idPostulacion = idPostulacion;
        this.idCurso = idCurso;
        this.idParticipante = idParticipante;
        this.estado = estado;
        this.nombre_curso = nombre_curso;
        this.nombre_participante = nombre_participante;
    }
}