import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesdatosService, Datos } from 'src/app/services/servicesdatos.service';
import { Platform, ToastController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {

  datos: Datos[] = [];
  newDato: Datos = <Datos>{};
  @ViewChild('myList') myList!: IonList;

  constructor(private storageService: ServicesdatosService,
    private plt: Platform, private toastController: ToastController) {
      this.plt.ready().then(()=>{
        this.loadDatos();
      })
    }

  ngOnInit() {
  }

  //get 
  loadDatos(){
    this.storageService.getDatos().then(datos=>{
      this.datos=datos;
    })
  }

  //create
  addDatos(){
    this.newDato.modified = Date.now();
    this.newDato.id = Date.now();
    this.storageService.addDatos(this.newDato).then(dato=>{
      this.newDato = <Datos>{};
      this.showToast('Datos agregados');
      this.loadDatos();
    })
  }

  //update
  updateDatos(dato: Datos){
    dato.nomMascota = `UPDATED: ${dato.nomMascota}`;
    dato.modified = Date.now();
    this.storageService.updateDatos(dato).then(item=>{
      this.showToast('Elemento actualizado')
      this.myList.closeSlidingItems();
      this.loadDatos
    })
  }

  //delete
  deleteDatos(dato: Datos){
    this.storageService.deleteDatos(dato.id).then(item=>{
      this.showToast('Elemento eliminado');
      this.myList.closeSlidingItems();
      this.loadDatos;
    })
  }

  async showToast(msg : string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
