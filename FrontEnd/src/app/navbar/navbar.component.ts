import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../model/employee';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  addForm: string = "addForm";
  searchForm: any;
  employees: Employee[] = [];
  searchResultNothing: boolean = false;
  @Input() employeeArray! : Employee[];
  
constructor(private router: Router){}


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
        key.reset();
      }}
      );
  }
  console.log(key.value.search);
  if(key.value.search===null || key.value.search.length===0){
    console.log(key.value.search);
  }

}

}

