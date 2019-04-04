import { Heroe } from './../../clases/heroe';
import { Component, OnInit, Input } from '@angular/core';

@Component({
// tslint:disable-next-line: component-selector
  selector: '[app-fila]', // cambia la forma en la que se lo llama desde el html, anotacion en el cuaderno
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.css']
})
export class FilaComponent implements OnInit {
  @Input() heroe: Heroe;

  constructor() { }

  ngOnInit() {
  }

}
