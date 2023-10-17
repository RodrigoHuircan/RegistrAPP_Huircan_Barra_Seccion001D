import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegistroserviceService } from 'src/app/services/registroservice.service';
import { RegistroDocenteserviceService } from 'src/app/services/registro-docenteservice.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  userName: String = '';


  constructor(private menuController: MenuController, private navController: NavController, private registroService: RegistroserviceService) {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName){
      this.userName = storedUserName
    }

 }

  ngOnInit() {
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

  cerrarSesion(){
    localStorage.removeItem('ingresado');
    this.navController.navigateRoot('login');
  }
}
