
import { Injectable } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class TaskService {
  taskTemplates$;

  constructor(private db: AngularFireDatabase,private route: ActivatedRoute) {  }

  //creating new tasks and adding to db
  create(tasks,currentDateTime){
    return this.db.database.ref('/tasks/').push(tasks).then((item)=>{
      this.db.database.ref('/tasks/'+item.key).update(currentDateTime);
    
    });

  }


  //MTK - 30/04/2018
  update(tasksId,tasks) {
    console.log("taskID"+tasksId);
    console.log("tasks:" + tasks);
    return this.db.object('/tasks/' +tasksId).update(tasks); 
  }
  getAllTask(){
    return this.db.list('/tasks', {
      query: {
        orderByChild: 'taskDate'
      }
    });

  }

  getTaskById(userId){
    return this.db.list('/tasks', {
      query: {
        orderByChild: 'eachUserID',
        equalTo: userId
      }
    });
  }

  getTaskInfo(tasksId){
    return this.db.object('/tasks/' + tasksId);
    
  }
}
