import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/employee';
import { HttpErrorResponse } from '@angular/common/http';
import { Contrat } from '../enum/contrat';
import { EmployeeLinkService } from '../service/employee-link.service';
import { DatePipe, formatDate } from '@angular/common';
import { Router } from '@angular/router'

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit{

    editForm: any;
    
    emailRegex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    phoneRegex: string = "^((\\+33-?)|0)?[0-9]{9}$";
    nameRegex: string = "^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9]*$";

    linkSkillToEmployeeModal: string = "linkSkillToEmployeeModal";

    formatdate = 'dd/MM/yyyy'
    public contrat = Contrat;

    public iteratorPosition = Object.keys(this.contrat)
    .filter((v) => isNaN(Number(v)));

    ngOnInit() {
      this.editForm.setValue(this.employeeLinkService.employeeToLink);
      console.log(this.editForm.value);
      this.editForm.get('dob').patchValue(this.formatDate(new Date()));
      this.editForm.get('startDate').patchValue(this.formatDate(new Date()));
      this.editForm.get('endDate').patchValue(this.formatDate(new Date()));
    } 
  
    
  constructor(fb: FormBuilder, private employeeService: EmployeeService, private employeeLinkService: EmployeeLinkService, private router: Router){

    
    this.editForm = fb.group({
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
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  public editEmployees(editForm: NgForm): void{
    editForm.value.lastName = editForm.value.lastName.toUpperCase();
    console.log(editForm.value);
    this.employeeService.editEmployee(editForm.value).subscribe(
      (_response: Employee) => {
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
    this.router.navigate(['/employee'])
    .then(() => {
      window.location.reload();
    });
  }

  public skillAddEmployee(){
    this.employeeLinkService.selectModal="linkSkillToEmployeeModal"
   }
  
}
