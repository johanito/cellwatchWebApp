import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { TechniciansService } from '../services/technicians.service';

@Component({
  selector: 'cellwatch-navbar',
  templateUrl: './cellwatch-navbar.component.html',
  styleUrls: ['./cellwatch-navbar.component.css']
})
export class CellwatchNavbarComponent {

  techId;
  isLoggedIn;
  isCollapsed = true;
  //techId;
  admin$: Observable<firebase.User>;


  constructor(private authService: AuthService,
    private router: Router,
    private techniciansService: TechniciansService,
    private afAuth: AngularFireAuth) {

    authService.isAuthenticated()
      .subscribe(
        success => this.isLoggedIn = success
      );

      //displaying usersname when logged in
    //  this.techId=this.afAuth.auth.currentUser.uid;
      this.admin$ = afAuth.authState;
  }

  logout(){
    this.techId=this.afAuth.auth.currentUser.uid;
    this.authService.logout();
    this.router.navigate(['/login']);
    this.techniciansService.updateLoginStatus(this.techId,{online:false});
  }

}
