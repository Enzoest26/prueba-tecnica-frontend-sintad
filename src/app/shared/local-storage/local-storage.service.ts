import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(nombre : string) : any{
    return localStorage.getItem(nombre);
  }

  setItem(nombre : string, valor: string){
    localStorage.setItem(nombre, valor);
  }

  limpiar(){
    localStorage.clear();
  }

  removeItem(nombre: string){
    localStorage.removeItem(nombre);
  }
}
