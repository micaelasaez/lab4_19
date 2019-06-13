import { Injectable } from '@angular/core';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private firebaseAuth: AngularFireAuth) { }

  public CrearUsuario(mail: string, pass: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(mail, pass).then( (ress) => {
      console.log(ress);
      this.EnviarVerificacion(mail);
    });
  }
  private EnviarVerificacion(mail: string) {
    this.firebaseAuth.auth.currentUser.sendEmailVerification().then( (res) => {
      console.log(res);
    });
  }
  public IniciarSesion(mail: string, pass: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(mail, pass).then( (res) => {
      if (res.user.emailVerified) {
        return true;
      } else {
        return false;
      }
    });
  }
  public LogOut() {
    return this.firebaseAuth.auth.signOut();
  }
}
