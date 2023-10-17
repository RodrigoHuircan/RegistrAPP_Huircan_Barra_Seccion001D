import { Component, Inject, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from 'src/app/services/registroservice.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-estudiante',
  templateUrl: './login-estudiante.page.html',
  styleUrls: ['./login-estudiante.page.scss'],
})
export class LoginEstudiantePage implements OnInit {
  formularioLogin: FormGroup
  private usuarios: Usuario[] = [];
  constructor(private alertController: AlertController,
              private navController: NavController,
              private registroService: RegistroserviceService,
              private fb: FormBuilder,
){ 
                this.formularioLogin = this.fb.group({
                  'correo': new FormControl("", Validators.required),
                  'password': new FormControl("", Validators.required)
                })
              }

  ngOnInit() {
  }

  async Ingresar() {
    const f = this.formularioLogin.value;
  
    if (!f.correo || !f.password) {
      this.alertMsg();
      return;
    }
  
    this.registroService.getUsuarios().then((datos) => {
      this.usuarios = datos;
  
      for (let obj of this.usuarios) {
        if (obj.correoUsuario == f.correo && obj.passUsuario == f.password) {
          console.log('ingresado');
          localStorage.setItem('ingresado', 'true');
          localStorage.setItem('userName', obj.nomUsuario);
          this.navController.navigateRoot('inicio');
          return;
        }
      }
  
      this.alertMsg2();
    });
  }

  async alertMsg(){
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Es necesario rellenar todas las casillas correctamente',
      buttons: ['Aceptar'],
    });
    await alert.present();
    return;
  }

  async alertMsg2(){
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El usuario ingresado no existe, o las credenciales no coinciden',
      buttons: ['Aceptar'],
    });
    await alert.present();
    return;
  }


}

