import { Component, OnInit, Pipe } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { timer, interval } from 'rxjs';
import { NgForm, Validators, FormControl, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Urls } from './enum/urls';
import { Contrat } from './enum/contrat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})


export class AppComponent implements OnInit{

  addForm: any;
  editForm: any;
  numbCheck: any;
  searchForm: any;
  searchResultNothing: boolean = false;
  emailRegex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  phoneRegex: string = "^((\\+33-?)|0)?[0-9]{9}$";
  nameRegex: string = "^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9]*$";
  imageUrl: string ="";

 
  public employees: Employee[] | any;
  public tempEmployee!: Employee;
  public editEmployee!: Employee;
  public urls = Urls;
  public contrat = Contrat;


  public iteratorImage = Object.keys(this.urls)
  .filter((v) => isNaN(Number(v)));

  public iteratorPosition = Object.keys(this.contrat)
  .filter((v) => isNaN(Number(v)));
  
  constructor(fb: FormBuilder, private employeeService: EmployeeService){
    
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
        Validators.pattern(this.nameRegex)
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
        Validators.pattern(this.emailRegex)
      ]],
      phone: ['',[
        Validators.required,
        Validators.pattern(this.phoneRegex)
      ]],
      dob: [],
      imageUrl: [],
      linkedIn: [],
      sex: []

    })

    this.editForm = fb.group({
      id: [],
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
      sex: ["",]
    })

    this.searchForm = fb.group({
      search: []
    });
    
  }

  public onClose(formData: FormGroup): void{
    formData.reset();
    console.log(formData.value);
  }

  public getValue(addForm: FormGroup): void {
    console.log(addForm.value);
  }

  public getValueEdit(): string{
    return this.editEmployee.civility;
  }
  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      }, (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }

  public addEmployee(addForm: NgForm): void{
    addForm.value.lastName = addForm.value.lastName.toUpperCase();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (_response: Employee) => {
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    console.log(addForm.value);
  }

  public tempEditEmployees(employee: Employee): void{
    this.editForm.setValue(employee);
    console.log(this.editForm.value);
  }
  
  public editEmployees(editForm: NgForm): void{
    editForm.value.lastName = editForm.value.lastName.toUpperCase();
    console.log(editForm.value);
    this.employeeService.editEmployee(editForm.value).subscribe(
      (_response: Employee) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }

  public avatarEmployees(input: string): void{
    this.tempEmployee.imageUrl = input;
    this.employeeService.editEmployee(this.tempEmployee).subscribe(
      () => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

 public searchEmployee(key: NgForm): void{


  const searchEmployee: Employee[] = [];
  for(const searchs of this.employees){
    if(searchs.firstName.toLowerCase().indexOf(key.value.search.toLowerCase()) !== -1
    || searchs.lastName.toLowerCase().indexOf(key.value.search.toLowerCase()) !== -1){
      searchEmployee.push(searchs);
      console.log(searchs.firstName)
    }
  }
    this.employees = searchEmployee;
    if(searchEmployee.length ===0){
      console.log(searchEmployee.length);
      this.searchResultNothing = true;
      interval(2500).subscribe(n => 
        {if(n===0){
          this.searchResultNothing = false;
          this.getEmployees();
          key.reset();
        }}
        );
    }
    console.log(key.value.search);
    if(key.value.search===null || key.value.search.length===0){
      this.getEmployees();
      console.log(key.value.search);
    }

 }

 public tempsEmployee(employee: Employee){
  this.tempEmployee = employee;
  console.log(this.tempEmployee.id);
 }

 public deleteEmployees(): void {
  console.log(this.tempEmployee.firstName);
  this.employeeService.deleteEmployee(this.tempEmployee.id).subscribe(
    (response: void) => {
      this.getEmployees();
    },
    (error: HttpErrorResponse) => {
      alert(error.message)
    }
  );
 }
}


