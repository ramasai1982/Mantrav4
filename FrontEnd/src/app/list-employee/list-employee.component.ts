import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/employee';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeLinkService } from '../service/employee-link.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  searchForm: any;
  addForm: any;
  @Output() employeeLink = new EventEmitter<Employee>();

  emailRegex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  phoneRegex: string = "^((\\+33-?)|0)?[0-9]{9}$";
  nameRegex: string = "^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9]*$";

  employeeArray!: Employee[];
  employeeToLink!: Employee;
  searchResultNothing: boolean = false;
  emptyEmployeeList: boolean = false;
  newItemEvent: any;

  public employees: Employee[] | any;
  public tempEmployee!: Employee;

  constructor (fb: FormBuilder, private employeeService: EmployeeService, private employeeLinkService: EmployeeLinkService) {
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
      skill:[],
      imageUrl: [],
      linkedIn: [],
      sex: [],
      hourlyPay:[]

    })

    
  this.searchForm = fb.group({
    search: []
  });
  }

  ngOnInit() {
    this.getEmployees();
  }


  public tempEmployees(employeeToLink: Employee){
    this.employeeLinkService.employeeToLink = employeeToLink;
    this.tempEmployee = employeeToLink;
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        for (const employeeList of this.employees){
          if (employeeList===null){
            this.emptyEmployeeList=true;
          }
        }
        this.employeeArray = response;
      }, (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }

  public searchEmployee(key: NgForm): void{
    this.searchResultNothing = false;
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
      key.reset();
      this.getEmployees();

    }
    console.log(key.value.search);
    if(key.value.search===null || key.value.search.length===0){
      
      console.log(key.value.search);
    }
  
  }

  public deleteEmployees(): void {

    this.employeeService.deleteEmployee(this.tempEmployee.id).subscribe(
      (_response: void) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
   }
}
