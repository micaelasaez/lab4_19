import { Component, OnInit } from '@angular/core';
import { HeroeService } from '../../services/heroe.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  public lista: any;

  constructor(private serviceHeroe: HeroeService) {
    this.lista = serviceHeroe.GetData();
   }

  ngOnInit() {
  }

}
