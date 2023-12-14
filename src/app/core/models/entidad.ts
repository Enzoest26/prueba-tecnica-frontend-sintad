import { TipoContribuyente } from "./tipo-contribuyente";
import { TipoDocumento } from "./tipo-documento";

export interface Entidad {
    id: number;
    objTipoDocumento : TipoDocumento;
    nroDocumento: string;
    razonSocial: string;
    nombreComercial: string;
    objTipoContribuyente?: TipoContribuyente;
    direccion: string;
    telefono: string;
    estado: number;
}
