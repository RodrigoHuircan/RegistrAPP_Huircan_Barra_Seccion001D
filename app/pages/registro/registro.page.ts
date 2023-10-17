import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from 'src/app/services/registroservice.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;
  newUsuario: Usuario = <Usuario>{};
  constructor(private registroService: RegistroserviceService,
              private alertController: AlertController,
              private toastController: ToastController,
              private fb: FormBuilder,
              private navController: NavController) { 
                this.formularioRegistro = this.fb.group({
                  'nombre': new FormControl("", Validators.required),
                  'correo': new FormControl("", Validators.required),
                  'password': new FormControl("", Validators.required),
                  'confirmaPass': new FormControl("", Validators.required),
                });
  }

  ngOnInit() {
  }

  async CrearUsuario(){
    var form = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos Incompletos',
        message: 'Debe completar todos los datos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }

    this.newUsuario.nomUsuario = form.nombre,
    this.newUsuario.correoUsuario = form.correo,
    this.newUsuario.passUsuario = form.password,
    this.newUsuario.repassUsuario = form.confirmaPass

    this.registroService.addDatos(this.newUsuario).then(dato =>{
      this.newUsuario = <Usuario>{};
      this.showToast('Datos Agregados');
    });

    localStorage.setItem('ingresado', 'true');
    this.navController.navigateRoot('inicio');
    console.log(form.nombre);
  }

  async showToast(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    })
    toast.present();
  }
}
