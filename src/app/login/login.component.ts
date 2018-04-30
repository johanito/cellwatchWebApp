import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { TechniciansService } from '../services/technicians.service';
import { Technicians } from '../models/technicians';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginStatus } from '../models/login-status';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public admin$ = this.authService.admin;
  techId;
  id;
  technicians={};
  public status:Boolean=true;

  constructor(
    private formBuilder: FormBuilder,
    //MTK 23/04 - change user status online/offline
    private techniciansService: TechniciansService,
    private af: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
    private db: AngularFireDatabase,
    private route: ActivatedRoute
  ) {

    this.id = this.route.snapshot.paramMap.get('id');

    this.form = this.formBuilder.group({
      login_email: ['', Validators.required],
      login_password:['', Validators.required]

    });
  }

  ngOnInit() {
  }

  //login method
  login(){

    const inputValue = this.form.value;
    //console.log(inputValue.login_email, inputValue.login_password);

    this.authService.login(inputValue.login_email, inputValue.login_password)
    .subscribe(

      success => {
        this.techId=this.af.auth.currentUser.uid;
        this.techniciansService.updateLoginStatus(this.techId,{online:true});
        this.router.navigate(['/dashboard']),
        error => alert(error)
      });



  }


}
