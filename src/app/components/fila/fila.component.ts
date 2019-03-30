import { Component, OnInit, Input } from '@angular/core';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: '[app-fila]', // cambia la forma en la que se lo llama desde el html, anotacion en el cuaderno
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.css']
})
export class FilaComponent implements OnInit, Input {
  @Input() heroe: any;

  constructor() { }

  ngOnInit() {
  }

}
