import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: ToastrService) { }

  exito(mensaje : string){
    this.toast.success(mensaje);
  }

  error(mensaje: string){
    this.toast.error(mensaje);
  }

  info(mensaje : string){
    this.toast.info(mensaje);
  }
}
