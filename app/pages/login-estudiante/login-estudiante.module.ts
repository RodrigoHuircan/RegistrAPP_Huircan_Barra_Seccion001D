import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { LoginEstudiantePageRoutingModule } from './login-estudiante-routing.module';

import { LoginEstudiantePage } from './login-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginEstudiantePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginEstudiantePage]
})
export class LoginEstudiantePageModule {}
 