import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private loginService : LoginService, private formBuilder : FormBuilder, private toastService : ToastService){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  ingresar(){
    if(!this.loginForm.valid){
      this.toastService.error("Datos incorrectos");
      return;
    }

    this.loginService.ingresar(this.loginForm.value.username, this.loginForm.value.contrasenia);

  }
}
