import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { RegistroDocenteserviceService } from 'src/app/services/registro-docenteservice.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  ramoDocente: String = '';
  duracionRamo: String = '';
  ramoDocente2: String = '';
  duracionRamo2: String = '';

  constructor(private menuController: MenuController, private registroDocenteService: RegistroDocenteserviceService) { 
    const storedRamoDocente = localStorage.getItem('ramoDocente');
    if (storedRamoDocente){
      this.ramoDocente = storedRamoDocente
    }
    const storedDuracionRamo = localStorage.getItem('duracionRamo');
    if (storedDuracionRamo) {
      this.duracionRamo = storedDuracionRamo;
    }
    const storedRamoDocente2 = localStorage.getItem('ramoDocente2');
    if (storedRamoDocente2){
      this.ramoDocente2 = storedRamoDocente2
    }
    const storedDuracionRamo2 = localStorage.getItem('duracionRamo2');
    if (storedDuracionRamo2) {
      this.duracionRamo2 = storedDuracionRamo2;
    }
  }

  ngOnInit() {
  }

  mostrarMenu(){
    this.menuController.open('first');
  }
}

