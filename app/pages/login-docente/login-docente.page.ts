import { Component, Inject, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegistroDocenteserviceService, Docente } from 'src/app/services/registro-docenteservice.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-docente',
  templateUrl: './login-docente.page.html',
  styleUrls: ['./login-docente.page.scss'],
})
export class LoginDocentePage implements OnInit {
  formularioLogin: FormGroup;
  private Docente: Docente[] = [];
  constructor(private alertController: AlertController,
              private navController: NavController,
              private registroDocenteService: RegistroDocenteserviceService,
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
    let a = 0;
  
    if (!f.correo || !f.password) {
      this.alertMsg();
      return;
    }
  
    this.registroDocenteService.getDocente().then((datos) => {
      this.Docente = datos;
  
      if (datos.length === 0) {
        this.alertMsg(); // Mostrar mensaje si no hay docentes registrados
        return;
      }
  
      for (let obj of this.Docente) {
        if (obj.correoDocente === f.correo && obj.passDocente === f.password) {
          a = 1;
          console.log('ingresado');
          localStorage.setItem('ingresado', 'true');
          localStorage.setItem('userName', obj.nomDocente);
          localStorage.setItem('ramoDocente', obj.ramoDocente);
          localStorage.setItem('duracionRamo', obj.duracionRamo.toString());
          localStorage.setItem('ramoDocente2', obj.ramoDocente2);
          localStorage.setItem('duracionRamo2', obj.duracionRamo2.toString());
          this.navController.navigateRoot('inicio');
          return;
        }
      }
  
      if (a === 0) {
        this.alertMsg2(); // Mostrar mensaje si las credenciales son incorrectas
      }
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


