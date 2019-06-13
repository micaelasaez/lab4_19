import { FirebaseAuthService } from './../../services/firebase-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public formularioLogin: FormGroup;

  constructor(private loginService: LoginService, private router: Router,
    private authServ: FirebaseAuthService) { }

  ngOnInit() {
    this.formularioLogin = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.email ]),
      pass: new FormControl('', Validators.required),
    });
  }

  public Ingresar() {
    console.log(this.formularioLogin.value);
    this.authServ.CrearUsuario(this.formularioLogin.value.email, this.formularioLogin.value.pass).then( (ress) => {
      console.log(ress);
      console.log('registrado');
      alert('verfique su email!');
      this.router.navigate(['/login']);
    });
  }
}
