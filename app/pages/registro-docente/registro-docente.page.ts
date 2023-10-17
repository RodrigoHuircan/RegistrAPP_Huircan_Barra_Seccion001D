
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RegistroDocenteserviceService, Docente } from 'src/app/services/registro-docenteservice.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';


@Component({
  
  selector: 'app-registro-docente',
  templateUrl: './registro-docente.page.html',
  styleUrls: ['./registro-docente.page.scss'],
})
export class RegistroDocentePage implements OnInit {

  formularioRegistro: FormGroup;
  newUsuario: Docente = <Docente>{};
  constructor(private registroDocenteService: RegistroDocenteserviceService,
              private alertController: AlertController,
              private toastController: ToastController,
              private fb: FormBuilder,
              private navController: NavController) { 
                this.formularioRegistro = this.fb.group({
                  'nombre': new FormControl("", Validators.required),
                  'correo': new FormControl("", Validators.required),
                  'password': new FormControl("", Validators.required),
                  'confirmPass': new FormControl("", Validators.required),
                  'ramo': new FormControl("", Validators.required),
                  'duracion': new FormControl("", Validators.required),
                  'ramo2': new FormControl("", Validators.required),
                  'duracion2': new FormControl("", Validators.required),
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

    this.newUsuario.nomDocente   = form.nombre,
    this.newUsuario.correoDocente = form.correo,
    this.newUsuario.passDocente = form.password,
    this.newUsuario.repassDocente = form.confirmaPass,
    this.newUsuario.ramoDocente = form.ramo,
    this.newUsuario.duracionRamo = form.duracion,
    this.newUsuario.ramoDocente2 = form.ramo2,
    this.newUsuario.duracionRamo2 = form.duracion2,
    

    this.registroDocenteService.addDatos(this.newUsuario).then(dato =>{
      this.newUsuario = <Docente>{};
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

 