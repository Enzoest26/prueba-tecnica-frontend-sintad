import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private localStorageService: LocalStorageService, private router : Router){}

  cerrarSesion(){
    this.localStorageService.removeItem("token");
    this.router.navigate(["/login"]);
  }
}
