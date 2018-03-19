import { Component, OnInit } from '@angular/core';
import { TaskTypeService } from '../services/task-type.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {

  types$;
   
  constructor(private taskTypeService: TaskTypeService) {
     
    this.types$ = this.taskTypeService.getAllTaskTypes();
  }

  ngOnInit() {
  }

}
