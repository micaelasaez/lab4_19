import { Injectable } from '@angular/core';
import { Data } from '../clases/data';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  private lista: Array<Data> = [{
    id : '1',
    nombre : 'thor',
    sexo : 'ma', // ma fe sindefinir
    poder : 'rey del trueno',
    terreno : 'espacio' // aire agua fuego
  },
  {
    id : '2',
    nombre : 'captain marvel',
    sexo : 'fe',
    poder : 'energia',
    terreno : 'espacio'
  },
  {
    id : '3',
    nombre : 'aquaman',
    sexo : 'ma',
    poder : 'fuerza',
    terreno : 'agua y tierra'
  }];

  constructor() { }

  public GetData() {
    return this.lista;
  }
  public SetHeroe(heroe: Data) {
    this.lista.push(heroe);
  }

}
