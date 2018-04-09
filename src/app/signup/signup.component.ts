import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { TechniciansService } from '../services/technicians.service';
import { AngularFireAuth } from 'angularfire2/auth';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form: FormGroup;
  id;
  

  constructor (
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    private techniciansService: TechniciansService,
    private authService: AuthService,
    private router: Router,
    private af: AngularFireAuth
  ) {
    this.form = this.formBuilder.group({
      signup_email: ['', Validators.required],
      signup_password: ['', Validators.required],
      signup_confirm_password: ['', Validators.required]

    });
  }

  ngOnInit() {
  }

  signup(info){
    const inputValue = this.form.value;
    this.authService.signup(inputValue.signup_email, inputValue.signup_password)
    .subscribe(
      success => this.router.navigate(['/technicians/new']),
      error => alert(error));
      
      
  }






}
