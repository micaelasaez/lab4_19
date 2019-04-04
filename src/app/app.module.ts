import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { Clase1Component } from './components/clase1/clase1.component';
import { Clase2Component } from './components/clase2/clase2.component';
import { ListadoComponent } from './components/listado/listado.component';
import { GrillaComponent } from './components/grilla/grilla.component';
import { FilaComponent } from './components/fila/fila.component';
import { FormularioComponent } from './components/formulario/formulario.component';


@NgModule({
  declarations: [
    AppComponent,
    Clase1Component,
    Clase2Component,
    ListadoComponent,
    GrillaComponent,
    FilaComponent,
    FormularioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
