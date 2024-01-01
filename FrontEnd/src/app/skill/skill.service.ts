import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from './skill';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addSkill(comp: Skill): Observable<Skill>{
    return this.http.post<Skill>(`${this.apiServerUrl}/skill/add`, comp)
  }

  public getSkill(): Observable<Skill[]>{
    return this.http.get<Skill[]>(`${this.apiServerUrl}/skill/list`)
  }

  public deleteSkill(skillId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/skill/delete/${skillId}`)
  }

  public addSkillToEmployee(employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/link`, employee)
  }

}
