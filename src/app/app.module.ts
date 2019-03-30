import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { Clase1Component } from './components/clase1/clase1.component';
import { Clase2Component } from './components/clase2/clase2.component';
import { ListadoComponent } from './components/listado/listado.component';
import { GrillaComponent } from './components/grilla/grilla.component';
import { FilaComponent } from './components/fila/fila.component';

@NgModule({
  declarations: [
    AppComponent,
    Clase1Component,
    Clase2Component,
    ListadoComponent,
    GrillaComponent,
    FilaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
