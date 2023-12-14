import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDocumento } from 'src/app/core/models/tipo-documento';
import { BASE_URL_API } from 'src/app/shared/constantes';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  constructor(private httpClient: HttpClient) { }

  listarTodos() : Observable<TipoDocumento[]>{
    return this.httpClient.get<TipoDocumento[]>(`${BASE_URL_API}/tipos-documentos`);
  }

  registrar(body : any) : Observable<TipoDocumento>{
    return this.httpClient.post<TipoDocumento>(`${BASE_URL_API}/tipos-documentos`, body);
  }

  actualizar(id: number, body: any) : Observable<TipoDocumento>{
    return this.httpClient.put<TipoDocumento>(`${BASE_URL_API}/tipos-documentos/${id}`, body);
  }

  eliminar(id: number) : Observable<any>{
    return this.httpClient.delete<any>(`${BASE_URL_API}/tipos-documentos/${id}`);
  }

  buscarPorId(id : number) : Observable<TipoDocumento>{
    return this.httpClient.get<TipoDocumento>(`${BASE_URL_API}/tipos-documentos/${id}`);
  }
}
