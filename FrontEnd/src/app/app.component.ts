import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from './model/employee';
import { EmployeeService } from './service/employee.service';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Urls } from './enum/urls';
import { Contrat } from './enum/contrat';
import { Skill } from './model/skill';
import { EmployeeLinkService } from './service/employee-link.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})


export class AppComponent {

  addForm: any;
  editForm: any;
  numbCheck: any;

 
  emailRegex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  phoneRegex: string = "^((\\+33-?)|0)?[0-9]{9}$";
  nameRegex: string = "^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9]*$";
  imageUrl: string ="";
  addSkillModal: string ="addSkillModal";
  deleteSkillModal: string ="deleteSkillModal";

  employeeToLink!: Employee;
  employeeArray!: Employee[];

  person: Array<string> = ["r", "t", "i"]

 
  public employees: Employee[] | any;
  public tempEmployee!: Employee;
  public skillList: Skill [] |any;
  public editEmployee!: Employee;
  public urls = Urls;
  public contrat = Contrat;

  tempEmployees(linkEmployeeFromChild: Employee) {
    this.employeeToLink=linkEmployeeFromChild;
  }


  public iteratorImage = Object.keys(this.urls)
  .filter((v) => isNaN(Number(v)));

  public iteratorPosition = Object.keys(this.contrat)
  .filter((v) => isNaN(Number(v)));
  
  constructor(private employeeService: EmployeeService, private employeeLinkService: EmployeeLinkService){
    
  }

  public avatarEmployees(input: string): void{
    console.log(input);
    this.tempEmployee=this.employeeLinkService.employeeToLink;
    this.tempEmployee.imageUrl = input;
    console.log(this.employeeLinkService.employeeToLink);
    this.employeeService.editEmployee(this.tempEmployee).subscribe(
      () => {

      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

 public tempsEmployee(employee: Employee){
  this.tempEmployee = employee;
  console.log(this.tempEmployee.id);
 }

}


