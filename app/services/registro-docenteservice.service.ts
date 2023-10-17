import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Docente {
  nomDocente: string;
  correoDocente: string;
  passDocente: string;
  repassDocente: string; 
  ramoDocente: string;
  duracionRamo: number;
  ramoDocente2: string;
  duracionRamo2: number;
}

const USERS_KEY = 'my-docente';

@Injectable({
  providedIn: 'root'
})
export class RegistroDocenteserviceService {

  newDocente: Docente = <Docente>{};
  constructor(private storage: Storage, private _storage: Storage) {
    this.init();
   }

   async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async addDatos(dato: Docente): Promise<any>{
    return this.storage.get(USERS_KEY).then((datos : Docente[])=>{
      if (datos) {
        datos.push(dato);
        return this.storage.set(USERS_KEY, datos);
      }
      else {
        return this.storage.set(USERS_KEY, [dato])
      }
    })
  }

  async getDocente(): Promise<Docente[]> {
    return this.storage.get(USERS_KEY);
  }

}

