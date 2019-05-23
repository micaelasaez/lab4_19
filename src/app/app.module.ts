import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoComponent } from './components/listado/listado.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { CargaComponent } from './components/carga/carga.component';
import { HeroeService } from './services/heroe.service';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { AuthService } from './services/auth.service';

import { FileReaderComponent } from './components/file-reader/file-reader.component';
import { GaleriaComponent } from './components/galeria/galeria.component';

import { FileDropModule } from 'ngx-file-drop';
import { NgxGalleryModule } from 'ngx-gallery';

@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    ErrorComponent,
    HomeComponent,
    MenuComponent,
    CargaComponent,
    LoginComponent,
    FileReaderComponent,
    GaleriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileDropModule,
    NgxGalleryModule
  ],
  providers: [
    HeroeService,
    LoginService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
