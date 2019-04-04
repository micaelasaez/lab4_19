import { Component, OnInit } from '@angular/core';
import { Heroe } from './../../clases/heroe';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  listado = Heroe.GetData();

  constructor() {
  }

  ngOnInit() {
  }

  public cargar(heroe: Heroe) {
    console.log(heroe);
    Heroe.AddData(heroe);
  }

}
