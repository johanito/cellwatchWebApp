import { Component, OnInit } from '@angular/core';
import { TechniciansService } from "../services/technicians.service";
import { TaskService } from "../services/task.service";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { TechNamesService } from "../services/tech-names.service";
import { Router, ActivatedRoute } from '@angular/router';
import { TaskTypeService } from '../services/task-type.service';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  //list of technames
  techNames$;
  //list of types
  taskTypes$;
  //list of status
  taskStatus$;
  //list of tasks
  tasks={};
  taskId; 


  constructor(
    private db: AngularFireDatabase,
    private techNamesService: TechNamesService,
    private taskService: TaskService,
    private taskTypeService: TaskTypeService,
    private router: Router,
    private route: ActivatedRoute) {

      //dropdown list technicians name
      this.techNames$ = techNamesService.getTechNames();
      //dropdown list task types
      this.taskTypes$ = taskTypeService.getTaskTypes();
      //dropdown list type status
      this.taskStatus$ = taskTypeService.getTaskStatus();


      this.taskId = this.route.snapshot.paramMap.get('id');
      if (this.taskId) this.taskService.getTaskInfo(this.taskId).take(1).subscribe(t => this.tasks = t);
      }


    //   //get task details and insert inside form&card
    //   let taskId = this.route.snapshot.paramMap.get('id');
    //   if (taskId) this.taskService.getTaskInfo(taskId).take(1).subscribe( b => this.tasks = b);

    // }
  
    
    update(tasks){

      this.taskService.update(this.taskId,tasks);
      this.router.navigate(['/task']);
    
     }


  ngOnInit() {
  }

}
