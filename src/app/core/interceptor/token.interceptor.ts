import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private localStorageService : LocalStorageService, private toastService : ToastService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes("/api")){
      let token = this.localStorageService.getItem("token");
      if(token)
      {
        request = request.clone({
          setHeaders: {Authorization : `Bearer ${token}`}
        });
      }
    }
    return next.handle(request).pipe(tap({
      next: (event) =>{

      }, error: (error) =>{
        if(error.status === 400){
          this.toastService.error(error.error.mensajeError);
        }
        if(error.status === 403){
          this.toastService.error("Token expirado, ingrese nuevamente.");
          this.localStorageService.removeItem("token");
          this.router.navigate(["/login"]);
        }else if(error.status === 500){
          this.toastService.error("Ocurrio un error inesperado del servidor. " + error.error.mensajeError);
        }else if(error.status === 0){
          this.toastService.error("No hubo comunicación con el servidor")
        }
      }
    }));
  }
}
