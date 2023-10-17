import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

interface Pagina {
  icon: string;
  name: string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  
  paginas : Pagina[] = [
    {
      icon: 'home-outline',
      name: 'Inicio',
      redirecTo: '/inicio'   
    },
    {
      icon: 'people-circle-outline',
      name: 'Nosotros',
      redirecTo: '/nosotros'
    },
    {
      icon: 'newspaper-outline',
      name: 'Noticias',
      redirecTo: '/api'
    },
    {
    icon: 'book-outline',
    name: 'Mis Cursos',
    redirecTo: '/cursos'
    }
  ];
  constructor(private navController: NavController) {
  }

  cerrarSesion(){
    localStorage.removeItem('ingresado');
    this.navController.navigateRoot('login');
  }
}
