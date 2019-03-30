import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.css']
})
export class GrillaComponent implements OnInit, Input {
  @Input() lista: Array<any>;

  constructor() {
    // console.log(this.lista);
  }

  ngOnInit() {
  }

}
