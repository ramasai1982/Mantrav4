import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/employee';
import { HttpErrorResponse } from '@angular/common/http';
import { Contrat } from '../enum/contrat';
import { EmployeeLinkService } from '../service/employee-link.service';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.css']
})
export class EmployeeformComponent implements OnInit{

  formEmployee: any;
  emailRegex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  phoneRegex: string = "^((\\+33-?)|0)?[0-9]{9}$";
  nameRegex: string = "^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9]*$";

  linkSkillToEmployeeModal: string = "linkSkillToEmployeeModal";
  employee: Employee | undefined;

  public formSelect!: string;
  public contrat = Contrat;
  public visible: boolean = false;
  public collapse!: string;


  public iteratorPosition = Object.keys(this.contrat)
  .filter((v) => isNaN(Number(v)));

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      this.formSelect = params['form'];
      console.log(this.formSelect);
      this.reload(this.formSelect);
    });
  } 

  
constructor(fb: FormBuilder,
  private employeeService: EmployeeService,
  private employeeLinkService: EmployeeLinkService,
  private router: Router,
  private route: ActivatedRoute){


  
  this.formEmployee = fb.group({
    id: [],
    skill:[],
    employeeCode: [],
    martialStatus:[],
    street:[],
    city:[],
    positionType:[],
    jobTitle:[],
    startDate:[],
    endDate:[],
    pinCode:[],
    civility: ["",[
      Validators.required,
      Validators.pattern(this.nameRegex)
    ]],
    lastName: ["",[
      Validators.required,
    ]],
    firstName: ["",[
      Validators.required,
    ]],
    email: ["",[
      Validators.required,
      Validators.pattern(this.emailRegex)
    ]],
    phone: ["",[
      Validators.required,
      Validators.pattern(this.phoneRegex)
    ]],
    dob: ["",],
    imageUrl: ["",],
    linkedIn: ["",],
    sex: ["",],
    hourlyPay:[]
  }) 
}


private formatDate(date: Date) {
  
  const d = new Date(date);
  console.log(date);
  let month = '' + (d.getMonth() + 1);
  console.log(month);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}


public actEmployees(formEmployee: NgForm): void{
  if(this.formSelect=='edit'){
    formEmployee.value.lastName = formEmployee.value.lastName.toUpperCase();
    console.log(formEmployee.value);
    formEmployee.value.skill=this.employeeLinkService.employeeToLink.skill;
    formEmployee.value.mission=this.employeeLinkService.employeeToLink.mission;
    this.employeeService.editEmployee(formEmployee.value).subscribe(
      (_response: Employee) => {
        this.router.navigate(['/employee'])
        .then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }
  else if(this.formSelect=='add'){
    formEmployee.value.lastName = formEmployee.value.lastName.toUpperCase();
    this.employeeService.addEmployee(formEmployee.value).subscribe(
      (_response: Employee) => {
        formEmployee.reset();
        this.router.navigate(['/employee'])
        .then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  
}

private reload(selection: string){
  console.log("reached reload")
  if(selection==="add"){
    console.log("add reached")
    this.formEmployee.reset();
  }
  if(selection=='edit'){
    console.log(this.formEmployee.get('dob').value);
    this.formEmployee.patchValue(this.employeeLinkService.employeeToLink);
    console.log(this.formEmployee.get('dob').value);
    this.formEmployee.get('dob').patchValue(this.formatDate(this.formEmployee.get('dob').value));
  this.formEmployee.get('startDate').patchValue(this.formatDate(this.formEmployee.get('startDate').value));
  this.formEmployee.get('endDate').patchValue(this.formatDate(this.formEmployee.get('endDate').value));
  }
  
}

public skillAddEmployee(){
  this.employeeLinkService.selectModal="linkSkillToEmployeeModal"
 }

}