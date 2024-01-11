import { Time } from "@angular/common";

export interface Viaje{
    coste: number,
    destino: string,
    id: string,
    pasajeros: number,
    patente: string,
    salida: Time
}