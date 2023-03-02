import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskApiService } from 'src/app/task-api.service';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})
export class ShowTaskComponent implements OnInit {

  taskList$!:Observable<any[]>;
  taskTypeList$!:Observable<any[]>;
  taskTypeList:any=[];

  // Map to display data associate with foreign keys
  taskTypeMap:Map<Number, string> = new Map()

  constructor(private service:TaskApiService) { }

  ngOnInit(): void {
    this.taskList$ = this.service.getTaskList();
    this.taskTypeList$ = this.service.getTaskTypeList();
    this.refreshTaskTypeMap();
  }

  // Variables (properties)
  modalTitle:string = '';
  activateFormTaskComponent:boolean = false;
  task:any;

  modalAdd() {
    this.task = {
      id:0,
      status:null,
      taskTypeId:null
    }
    this.modalTitle = "Add Task";
    this.activateFormTaskComponent = true;
  }

  refreshTaskTypeMap() {
    this.service.getTaskTypeList().subscribe(data => {
      this.taskTypeList = data;

      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        this.taskTypeMap.set(element.id, element.typeName);
        
      }
    })
  }
 
}
