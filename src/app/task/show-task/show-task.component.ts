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

  modalEdit(item:any) {
    this.task = item;
    this.modalTitle = "Edit Task";
    this.activateFormTaskComponent = true;
  }

  delete(item:any) {
    if (confirm(`Are you sure you want to delete task "${item.taskName}"`)) {
      this.service.deleteTask(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('form-modal-close');
        if(closeModalBtn) {
          closeModalBtn.click();
        }

        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = "block";
        }

        setTimeout(function() {
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = "none";
          }
        }, 4000);
        this.taskList$ = this.service.getTaskList();
      })
    }
  }

  modalClose() {
    this.activateFormTaskComponent = false;
    this.taskList$ = this.service.getTaskList(); 
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
