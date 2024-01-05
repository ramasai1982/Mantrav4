import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../model/employee';
import { Contrat } from '../enum/contrat';
import { Router } from '@angular/router';
import { EmailValidator } from '../validators/email.validators';
import { NoSpaceValidator } from '../validators/nospace.validators';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  addForm: any;

  emailRegex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  phoneRegex: string = "^((\\+33-?)|0)?[0-9]{9}$";
  nameRegex: string = "^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9]*$";

  public contrat = Contrat;

  public iteratorPosition = Object.keys(this.contrat)
  .filter((v) => isNaN(Number(v)));

  constructor(fb: FormBuilder, private employeeService:EmployeeService, private router: Router){

    this.addForm = fb.group({
      martialStatus:[],
      street:[],
      city:[],
      positionType:[],
      jobTitle:[],
      startDate:[],
      endDate:[],
      pinCode:[],
      civility: ['',[
        Validators.required,
        Validators.pattern(this.nameRegex),
        NoSpaceValidator
      ]],
      lastName: ['',[
        Validators.required,
        Validators.pattern(this.nameRegex)
      ]],
      firstName: ['',[
        Validators.required,
      ]],
      email: ['',[
        Validators.required,
        EmailValidator
      ]],
      phone: ['',[
        Validators.required,
        Validators.pattern(this.phoneRegex)
      ]],
      dob: [],
      skill:[],
      imageUrl: [],
      linkedIn: [],
      sex: [],
      hourlyPay:[]

    })

  }

  public addEmployee(addForm: NgForm): void{
    addForm.value.lastName = addForm.value.lastName.toUpperCase();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (_response: Employee) => {

        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.router.navigate(['/employee']);
    console.log(addForm.value);
  }
}
