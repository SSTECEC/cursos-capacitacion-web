export class Participante {
    idParticipante: number;
    nombreP: string;
    identificacionP: string;
    correoP : string;
    direccionP : string;
    paisP : string;
    ciudadP : string;
    provinciaP : string;
    estadoCivilP : string;
    fechaNac : string;
    nombreRefeP : string;
    correoRefeP : string;
    contactoP : string;
    parentescoP : string;
    nombreRefeL : string;
    correoRefeL : string;
    contactoL : string;
    parentescoL : string;
    estadoP : number;
 

    constructor(nombreP: string, idParticipante:number, identificacionP: string, correoP:string, direccionP:string, paisP: string, ciudadP:string, 
        provinciaP: string, estadoCivilP: string, fechaNac: string, nombreRefeP: string, correoRefeP: string, contactoP: string,
        parentescoP: string, nombreRefeL: string, correoRefeL: string, contactoL: string, parentescoL:string, estadoP: number,) {
        
        this.idParticipante = idParticipante;
        this.nombreP = nombreP;
        this.identificacionP = identificacionP;
        this.correoP = correoP;
        this.direccionP = direccionP;
        this.paisP = paisP;
        this.ciudadP = ciudadP;
        this.provinciaP = provinciaP;
        this.estadoCivilP = estadoCivilP;
        this.fechaNac = fechaNac;
        this.nombreRefeP = nombreRefeP;
        this.correoRefeP = correoRefeP;
        this.contactoP = contactoP;
        this.parentescoP = parentescoP;
        this.nombreRefeL = nombreRefeL;
        this.correoRefeL = correoRefeL;
        this.contactoL = contactoL;
        this.parentescoL = parentescoL;
        this.estadoP = estadoP;

    }
}