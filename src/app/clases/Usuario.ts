export class Usuario {
    idPostulacion: number;
    nombreP: string;
    correoP : string;
    direccionP : string;
    paisP : string;
    ciudadP : string;
    provinciaP : string;
    estadoCivilP : string;
    nombreRefP : string;
    correoRefP : string;
    contactoRefP : string;
    parentescoRefP : string;
    nombreRefL : string;
    correoRefL : string;
    contactoRefL : string;
    parentescoRefL : string;


    constructor(idPostulacion:number, nombreP:string, correoP:string, direccionP: string, paisP:string, ciudadP: string, provinciaP: string, estadoCivilP: string,
        nombreRefP: string, correoRefP: string, contactoRefP: string, parentescoRefP: string,nombreRefL: string, correoRefL: string, contactoRefL: string, parentescoRefL: string   ) {
        this.idPostulacion = idPostulacion;
        this.nombreP = nombreP;
        this.correoP = correoP;
        this.direccionP = direccionP;
        this.paisP = paisP;
        this.ciudadP = ciudadP;
        this.provinciaP = provinciaP;
        this.estadoCivilP = estadoCivilP;
        this.nombreRefP = nombreRefP;
        this.correoRefP = correoRefP;
        this.contactoRefP = contactoRefP;
        this.parentescoRefP = parentescoRefP;
        this.nombreRefL = nombreRefL;
        this.correoRefL = correoRefL;
        this.contactoRefL = contactoRefL;
        this.parentescoRefL = parentescoRefL;
    }
}