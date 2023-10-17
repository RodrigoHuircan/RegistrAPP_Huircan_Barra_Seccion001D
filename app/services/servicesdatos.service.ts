import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { registerPlugin } from '@capacitor/core';
import { Storage } from '@ionic/storage'

export interface Datos{
  id: number;
  nomMascota: string;
  razaMascota: string;
  edadMascota: number;
  modified: number;
}


const ITEMS_KEY = 'my-datos';
@Injectable({
  providedIn: 'root'
})
export class ServicesdatosService {
  //private _storage: any; //Revisar en caso de

  constructor(private storage: Storage, private _storage: Storage) { 
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }
  
  //Añadir datos
  async addDatos(dato: Datos): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((datos : Datos[])=>{
      if (datos){
        datos.push(dato);
        return this.storage.set(ITEMS_KEY, datos);
      }
      else{
        return this.storage.set(ITEMS_KEY, [dato])
      }
    })
  }

  //Capturar datos
  getDatos(): Promise<Datos[]>{
    return this.storage.get(ITEMS_KEY);
  }

  //Actualizar datos
  async updateDatos (dato: Datos): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((datos : Datos[])=>{
      if (!datos || datos.length == 0){
        return null;
      }
      let newDato: Datos[] = [];
      for (let i of datos){
        if (i.id == dato.id){
          newDato.push(dato);
        }
        else{
          newDato.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, newDato)
    })
  }

  //Eliminar datos
  async deleteDatos(id: number): Promise<Datos>{
    return this.storage.get(ITEMS_KEY).then((datos : Datos[])=>{
      if (!datos || datos.length === 0){
        return null;
      }
      let toKeep: Datos[] = [];
      for (let i of datos){
        if (i.id !== id){
          toKeep.push(i)
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    })
  }
}
