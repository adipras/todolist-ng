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

  ngOnInit(): void {
  }

}
