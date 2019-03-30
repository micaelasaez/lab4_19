import { Component, OnInit } from '@angular/core';
import { Data } from '../../data';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  listado = new Data().lista;
  //listado = GetData();

  constructor() {
  }

  ngOnInit() {
  }

}
