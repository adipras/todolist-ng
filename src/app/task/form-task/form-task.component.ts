import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskApiService } from 'src/app/task-api.service'; 

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.css']
})
export class FormTaskComponent implements OnInit {
  taskList$!: Observable<any[]>
  statusList$!: Observable<any[]>
  taskTypeList$!: Observable<any[]>

  constructor(private service:TaskApiService) { }
  
  @Input() task:any;
  id: number = 0;
  status: string = "";
  taskName: string = "";
  taskTypeId!: number;

  ngOnInit(): void {
    this.id = this.task.id;
    this.status = this.task.status;
    this.taskName = this.task.taskName;
    this.taskTypeId = this.task.taskTypeId;
    this.statusList$ = this.service.getStatusList();
    this.taskList$ = this.service.getTaskList();
    this.taskTypeList$ = this.service.getTaskTypeList();
  }

  addTask() {
    var task = {
      status: this.status,
      taskName: this.taskName,
      taskTypeId: this.taskTypeId
    }
    this.service.addTask(task).subscribe(res => {
      var closeModalBtn = document.getElementById('form-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if (showAddSuccess) {
        showAddSuccess.style.display = "block";
      }

      setTimeout(function() {
        if (showAddSuccess) {
          showAddSuccess.style.display = "none";
        }
      }, 4000);
    })
  }

  updateTask() {
    var task = {
      id: this.id,
      status: this.status,
      taskName: this.taskName,
      taskTypeId: this.taskTypeId
    }
    var id:number = this.id;
    this.service.updateTask(id, task).subscribe(res => {
      var closeModalBtn = document.getElementById('form-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if (showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }

      setTimeout(function() {
        if (showUpdateSuccess) {
          showUpdateSuccess.style.display = "none";
        }
      }, 4000);
    })
  }

}
