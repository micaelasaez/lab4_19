import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clase2',
  templateUrl: './clase2.component.html',
  styleUrls: ['./clase2.component.css']
})
export class Clase2Component implements OnInit {

  superheroe = [{
    id : 1,
    nombre : 'thor',
    sexo : 'ma', // ma fe sindefinir
    poder : 'rey del trueno',
    terreno : 'tierra' // aire agua fuego
  },
  {
    id : 2,
    nombre : 'captain marvel',
    sexo : 'fe', // ma fe sindefinir
    poder : 'energia',
    terreno : 'tierra' // aire agua fuego
  },
  {
    id : 3,
    nombre : 'aquaman',
    sexo : 'ma', // ma fe sindefinir
    poder : 'fuerza',
    terreno : 'agua' // aire agua fuego
  }];

  constructor() { }

  ngOnInit() {
  }

}
