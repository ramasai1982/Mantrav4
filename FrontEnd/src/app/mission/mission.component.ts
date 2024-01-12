import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { MissionService } from '../service/mission.service';
import { Mission } from '../model/mission';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeLinkService } from '../service/employee-link.service';
import { MissionByEmployee } from '../model/missionByEmployee';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {

  missions: Mission[] = [];
  missionToDisplay: Array<any> = [];
  employeeId: number | any;

  constructor (private employeeService: EmployeeService, private missionService: MissionService, private employeeLinkService: EmployeeLinkService){}

  ngOnInit(): void {
    this.employeeId = this.employeeLinkService.employeeToLink.id;
    this.getMissionByEmployee(this.employeeId);
  }

  public getMissionByEmployee(employeeId: number){
    this.missionService.getMissionByEmployee().subscribe(
      (response:MissionByEmployee[]) => {
        for(const list of response){
           if(list.id===employeeId){
            this.missionToDisplay.push(list);
           }
        }
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }


  public getMission(){
    this.missionService.getMission().subscribe(
      (response: Mission[]) => {
        this.missions = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }



}
