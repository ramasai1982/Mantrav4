import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SkillService } from './skill.service';
import { Skill } from './skill';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { __values } from 'tslib';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent {
  addSkillForm: any;
  linkSKillForm: any;
  deleteSkillForm: any;
  nameRegex: string = "^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9]*$";
  @Input() selectModal!: string;
  @Input() employeeToLink! : Employee;
  
  public skills: Skill[] | any;
  public tempArray: Skill[] = [];
  public tempSet: Set<Skill> = new Set<Skill>();
  public sendSkillArray: Array<any> = [];
  public tempCount: boolean = false;
  

constructor(fb: FormBuilder, private skillService: SkillService){
  this.addSkillForm = fb.group({
    comp:['',[
      Validators.required,
      Validators.pattern(this.nameRegex)
    ]]
  })

  this.linkSKillForm = fb.group({
    id: [],
    martialStatus:[],
    employeeCode: [],
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
      Validators.required
    ]],
    phone: ['',[
      Validators.required
    ]],
    dob: [],
    skill:[],
    imageUrl: [],
    linkedIn: [],
    sex: [],
    hourlyPay:[]
  })

  this.deleteSkillForm = fb.group({
    comp:['',[
      Validators.required,
      Validators.pattern(this.nameRegex)
    ]]
  })


}

ngOnInit() {
  this.getSkill();
}

public getSkill(): void {
  this.skillService.getSkill().subscribe(
    (response: Skill[]) => {
      this.skills = response;
    }, (error: HttpErrorResponse) =>{
      alert(error.message);
    }
  )
}

public tempSkill(skill: Skill){
  this.tempArray=this.employeeToLink.skill;
  console.log(skill.idC, this.tempArray.length);
  for(const search of this.tempArray){
    console.log(search);
    if((search.comp.toLowerCase().indexOf(skill.comp.toLowerCase())) !== -1){
      this.tempCount = true;
      console.log(this.tempCount);
    }
  }
  if(!this.tempCount){
    
    this.tempArray.push(skill);
    console.log(this.tempArray);
  }
  console.log(this.tempArray);
  this.tempCount = false;
}

public deleteSkill(): void{
  console.log(this.tempArray);

  for (const tempList of this.tempArray){
    console.log(tempList.idC);
    this.skillService.deleteSkill(tempList.idC).subscribe(
      (_response: void) => {
        this.getSkill();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }
  this.tempArray = [];
}

public addSkill(addSkillForm: NgForm): void{
  console.log(addSkillForm.value);
  this.skillService.addSkill(addSkillForm.value).subscribe(
    (response: Skill) => {
      console.log(response.comp)
      addSkillForm.reset();
      this.getSkill();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )
}

public linkSkill(): void{

  console.log(this.employeeToLink);
  this.employeeToLink.skill=this.tempArray;
  this.linkSKillForm.setValue(this.employeeToLink);

  this.skillService.addSkillToEmployee(this.linkSKillForm.value).subscribe(
    (_response: Employee) => {
      console.log(this.linkSKillForm.values)
    },
    (error: HttpErrorResponse) => {
      alert(error.message)
    }
  );
}

public onClose(formData: FormGroup): void{
  formData.reset();
  console.log(formData.value);
}

public onCloseDelete(): void{
  this.tempArray = [];
}

public onCloseLinkSkill(): void{
  this.tempArray = [];
}
}
