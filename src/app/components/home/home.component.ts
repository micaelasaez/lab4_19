import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authServ: FirebaseAuthService, private router: Router) { }

  ngOnInit() {
  }
  public logOut() {
    this.authServ.LogOut().then( () => {
      this.router.navigate(['/login']);
    });
  }
}
