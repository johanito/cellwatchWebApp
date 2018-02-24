import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cellwatch-navbar',
  templateUrl: './cellwatch-navbar.component.html',
  styleUrls: ['./cellwatch-navbar.component.css']
})
export class CellwatchNavbarComponent {

  public isLoggedIn;
  admin$: Observable<firebase.User>;
  

  constructor(private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth) { 
    authService.isAuthenticated()
      .subscribe(
        success => this.isLoggedIn = success
      );
      
      //displaying usersname when logged in
      this.admin$ = afAuth.authState;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
