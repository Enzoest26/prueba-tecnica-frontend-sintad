import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_URL } from 'src/app/shared/constantes';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient, private toastService : ToastService, private localStorageService : LocalStorageService, private router : Router) { }

  ingresar(user : string, password : string){
    this.httpClient.post<any>(`${BASE_URL}/login`, {username : user, contrasenia : password}).subscribe({
      next: data =>{
        this.localStorageService.setItem("token", data.token);
        this.router.navigate(['/mantenimientos']);
      },
      error: error =>{
        this.toastService.error(error.error.mensajeError);
      }
    })
  }
}
