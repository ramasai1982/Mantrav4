import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/employee';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeLinkService } from '../service/employee-link.service';
import { tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';



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
  h!: number; 

  employeeArray!: Employee[];
  employeeToLink!: Employee;
  employee!: Employee;
  searchResultNothing: boolean = false;
  emptyEmployeeList: boolean = false;
  newItemEvent: any;
  isInProgress!: boolean;


  public employees: Employee[] | any;
  public tempEmployee!: Employee;

  constructor (fb: FormBuilder,
                private employeeService: EmployeeService,
                private employeeLinkService: EmployeeLinkService,
                private router: Router,
                private route: ActivatedRoute
                 ) {
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

  loading: any;
  ngOnInit() {
    this.getEmployees();
  }
  public tempEmployees(employeeToLink: Employee){
    this.employeeLinkService.employeeToLink = employeeToLink;
    this.tempEmployee = employeeToLink;
  }

  public callSkill (employee: Employee): void{
    this.router.navigate(['/employee/skill'], { queryParams: { selectModal: 'linkSkillToEmployeeModal', employeeLinkSkill: JSON.stringify(employee) } });
  }
    
  public exportFile(employeeToExport: Employee): void{
    console.log(employeeToExport);
    var str = JSON.stringify(employeeToExport);
    str = str
        .split(',')
        .join('\n')
        .split("{")
        .join("")
        .split("}")
        .join("")
        .split("[")
        .join("")
        .split("]")
        .join("");
    console.log(str);

    let filename = `dataexport_${employeeToExport.id}_${employeeToExport.lastName}.csv`;    
    console.log(filename);            //create filename
    const file = new File([str], filename, {type: 'text/csv'});     //create file
    console.log(file);   
    let a = document.createElement('a');    //create anchor
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
  }

  public tempEmployeeMission(employeeToLink: Employee){
    this.employeeLinkService.missionList.push([{"mission": employeeToLink.mission}, employeeToLink.lastName, employeeToLink.firstName]);
  }

  public getEmployees(): any {
    this.employeeService.getEmployees().pipe(
      tap(() => {
        this.isInProgress = true,  console.log("Starts")
      })
    ).subscribe( 
      (response: Employee[]) => {
        this.employees = response;
        console.log("at")
        for (const employeeList of this.employees){
          if (employeeList===null){
            this.emptyEmployeeList=true;
          }
        }
        this.isInProgress= false;
        this.employeeArray = response;
      },
      (error: HttpErrorResponse) =>{
        this.isInProgress= false;
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
function ngOnDestroy() {
  throw new Error('Function not implemented.');
}

