import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';


export interface Producto {
  id: string;
  marca: string;
  precio: number;
}

@Component({
  selector: 'app-firebase-example',
  templateUrl: './firebase-example.component.html',
  styleUrls: ['./firebase-example.component.css']
})
export class FirebaseExampleComponent implements OnInit {
  items: Observable<any[]>;
  public marca: string;
  public precio: number;
  constructor(public db: AngularFireDatabase, private firestore: AngularFirestore) {
    this.items = this.firestore.collection('productos').snapshotChanges().pipe(map((fotos) => {
      return fotos.map((a) => {
        const data = a.payload.doc.data() as Producto;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  ngOnInit() {
  }

  Agregar() {
    this.firestore.collection('productos').add({
      marca: this.marca,
      precio: this.precio
    }).then( (res) => {
      console.log('Agregado');
    });
    this.marca = '';
    this.precio = 0;
  }
}
