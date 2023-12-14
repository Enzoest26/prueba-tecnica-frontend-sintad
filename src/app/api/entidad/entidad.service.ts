import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entidad } from 'src/app/core/models/entidad';
import { BASE_URL_API } from 'src/app/shared/constantes';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  constructor(private httpClient : HttpClient) { }

  listarTodos() : Observable<Entidad[]>{
    return this.httpClient.get<Entidad[]>(`${BASE_URL_API}/entidades`);
  }

  registrar(body: any) : Observable<Entidad>{
    return this.httpClient.post<Entidad>(`${BASE_URL_API}/entidades`, body);
  }

  actualizar(id : number,body: any) : Observable<Entidad>{
    return this.httpClient.put<Entidad>(`${BASE_URL_API}/entidades/${id}`, body);
  }

  eliminar(id: number) : Observable<any>{
    return this.httpClient.delete<any>(`${BASE_URL_API}/entidades/${id}`);
  }

  buscarPorId(id : number) : Observable<Entidad>{
    return this.httpClient.get<Entidad>(`${BASE_URL_API}/entidades/${id}`);
  }
}
