import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';
import { Skill } from './skill/skill';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerUrl= environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  public addEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee)
  }

  public deleteEmployee(employeeId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`)
  }

  public editEmployee(employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/edit`, employee)
  }


}
