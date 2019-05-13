import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formularioLogin: FormGroup;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.formularioLogin = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.email ]),
      pass: new FormControl('', Validators.required),
    });
  }

  public Ingresar() {
    console.log(this.formularioLogin.value);
    this.loginService.LogIn(this.formularioLogin.value.email, this.formularioLogin.value.pass).subscribe( rta => {
      console.log(rta);
// tslint:disable-next-line: no-string-literal
      const token = rta['empleadoJWT'];
      localStorage.setItem('token', token);
      this.router.navigate(['/menu']);
    });
  }

}
