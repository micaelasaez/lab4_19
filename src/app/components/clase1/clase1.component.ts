import { Component, OnInit, OnChanges, DoCheck, SimpleChanges, OnDestroy } from '@angular/core';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'app-clase1',
  templateUrl: './clase1.component.html',
  styleUrls: ['./clase1.component.css']
})
export class Clase1Component implements OnInit, OnChanges, DoCheck, OnDestroy {

  name = 'micaaa';
  text = 'ejemplo binding';
  imagen = 'assets/Lighthouse.jpg'; // no hace falta la ruta siempre lo encuentra
  lista = [ "aaa", "bbb", "ccc" ];


  ngDoCheck(): void {
    console.log('do check');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes');
  }
  ngOnDestroy(): void {
    console.log("on destroy");
  }

  constructor() { }

  ngOnInit() {
    console.log('on init');
  }

  miFuncionClick(event) {
    console.log("click");
    console.log(this.name);
    this.lista.push(this.name);
    console.log(this.lista);
    console.log(event);
  }



}
