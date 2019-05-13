import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService: HttpClient) { }

  public LogIn(emailUsuario: string, passUsuario: string) {
    const user = { email: emailUsuario, pass: passUsuario };
    return this.httpService.post('http://localhost/L4/backend/login', user);
  }
}
