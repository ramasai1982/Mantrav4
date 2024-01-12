import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLinkService {

  employeeToLink!: Employee;
  selectModal!: string;
  missionList: Array<any> = [];
  
  constructor() { }




}
