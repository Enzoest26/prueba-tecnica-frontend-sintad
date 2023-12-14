import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoContribuyente } from 'src/app/core/models/tipo-contribuyente';
import { BASE_URL_API } from 'src/app/shared/constantes';

@Injectable({
  providedIn: 'root'
})
export class TipoContribuyenteService {

  constructor(private httpClient : HttpClient) { }

  listarTodos() : Observable<TipoContribuyente[]>{
    return this.httpClient.get<TipoContribuyente[]>(`${BASE_URL_API}/tipos-contribuyentes`);
  }

  registrar(body : any) : Observable<TipoContribuyente>{
    return this.httpClient.post<TipoContribuyente>(`${BASE_URL_API}/tipos-contribuyentes`, body);
  }

  actualizar(id: number, body: any) : Observable<TipoContribuyente>{
    return this.httpClient.put<TipoContribuyente>(`${BASE_URL_API}/tipos-contribuyentes/${id}`, body);
  }

  eliminar(id: number) : Observable<any>{
    return this.httpClient.delete<any>(`${BASE_URL_API}/tipos-contribuyentes/${id}`);
  }

  buscarPorId(id : number) : Observable<TipoContribuyente>{
    return this.httpClient.get<TipoContribuyente>(`${BASE_URL_API}/tipos-contribuyentes/${id}`);
  }
}
