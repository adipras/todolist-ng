import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  readonly taskAPIUrl = "https://localhost:7029/api";

  constructor(private http:HttpClient) { }

  // Task
  getTaskList():Observable<any[]> {
    return this.http.get<any>(this.taskAPIUrl + '/tasks');
  }

  addTask(data:any) {
    return this.http.post(this.taskAPIUrl + '/tasks', data);
  }

  updateTask(id:number|string, data:any) {
    return this.http.put(this.taskAPIUrl + `/tasks/${id}`, data);
  }

  deleteTask(id:number|string) {
    return this.http.delete(this.taskAPIUrl + `/tasks/${id}`);
  }

  // Task Type
  getTaskTypeList():Observable<any[]> {
    return this.http.get<any>(this.taskAPIUrl + '/tasktypes');
  }

  addTaskType(data:any) {
    return this.http.post(this.taskAPIUrl + '/tasktypes', data);
  }

  updateTaskType(id:number|string, data:any) {
    return this.http.put(this.taskAPIUrl + `/tasktypes/${id}`, data);
  }

  deleteTaskType(id:number|string) {
    return this.http.delete(this.taskAPIUrl + `/tasktypes/${id}`);
  }

  // Status
  getStatusList():Observable<any[]> {
    return this.http.get<any>(this.taskAPIUrl + '/statuses');
  }

  addStatus(data:any) {
    return this.http.post(this.taskAPIUrl + '/statuses', data);
  }

  updateStatus(id:number|string, data:any) {
    return this.http.put(this.taskAPIUrl + `/statuses/${id}`, data);
  }

  deleteStatus(id:number|string) {
    return this.http.delete(this.taskAPIUrl + `/statuses/${id}`);
  }
}
