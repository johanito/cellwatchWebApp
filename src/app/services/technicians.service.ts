import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Technicians } from '../models/technicians';
import { AppUser } from '../models/app-user';
import { LoginStatus } from '../models/login-status';

@Injectable()
export class TechniciansService {
techId;


  constructor(private db: AngularFireDatabase, private af: AngularFireAuth) { }

  //create technicians with authentication
  create(techId,technicians){
    return this.db.database.ref('/users').child(techId).set(technicians);
  }

  pushUid(techId){
    return this.db.database.ref('/users').child(techId).set("");
  }

  //get/view all the data from database:table
  getAllInfo(){
    return this.db.list('/users/');
  }

  //get/view all the data from database:form&card
  getTechInfo(techniciansId){
    return this.db.object('/users/' + techniciansId);
  }

  //updating the technicians information
  update(techniciansId, technicians){
    return this.db.database.ref('/users/' +techniciansId).update(technicians);
  }

  //delete technicians locate using id
  delete(techId){
    return this.db.object('/users/' + techId).remove();
  }

  getSysRole() {
    return this.db.list('/sysRole/');
  }

  //updating online status when logged in/out
  updateLoginStatus(techniciansId,online){
  //  return this.db.object('/users/'+"3nT5DW21nMPDTT6r3AfNhcqgyPz2").update(LoginStatus);
    return this.db.object('/users/'+techniciansId).update(online);
  }




}
