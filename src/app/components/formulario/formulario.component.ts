import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Heroe } from './../../clases/heroe';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  @Output() cargar = new EventEmitter<Heroe>();
  public formularioIngreso: FormGroup;

  // con ngModel
  // heroe: Heroe = { id : '', nombre : '', sexo : '', poder : '', terreno : '' };

  constructor() { }

  ngOnInit() {
    this.formularioIngreso = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', [Validators.minLength(4), Validators.maxLength(10)]),
      sexo: new FormControl(''),
      poder: new FormControl(''),
      terreno: new FormControl(''),
    });
  }

  public IngresarHeroe() {
    // con ngModel
    // this.cargar.emit(this.heroe); // carga el heroe al evento output que se va enviar al componente padre y dispara el evento
    console.log(this.formularioIngreso);
    console.log(Validators);
    this.cargar.emit(this.formularioIngreso.value);
  }
}
