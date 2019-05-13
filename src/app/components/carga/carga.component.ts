import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HeroeService } from '../../services/heroe.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {
  public formularioIngreso: FormGroup;

  constructor(private servicioHeroe: HeroeService) { }

  ngOnInit() {
    this.formularioIngreso = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    sexo: new FormControl(''),
    poder: new FormControl(''),
    terreno: new FormControl(''),
    });
  }
  public IngresarHeroe() {
    console.log(this.formularioIngreso.value);
    //con servicio que se encarga de la logica
    this.servicioHeroe.SetHeroe(this.formularioIngreso.value);

    //Data.AddData(this.formularioIngreso.value); con clase data que maneja todo
    //this.cargar.emit(this.formularioIngreso.value); con output a componente padre

    this.formularioIngreso.reset();
  }
}
