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

import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseExampleComponent } from './components/firebase-example/firebase-example.component';
import { SignupComponent } from './components/signup/signup.component';

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
    GaleriaComponent,
    FirebaseExampleComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileDropModule,
    NgxGalleryModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    HeroeService,
    LoginService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
