import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './service/employee.service';
import { FormsModule } from '@angular/forms';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SkillComponent } from './skill/skill.component';
import { ArrayStringPipe } from './pipes/array-string.pipe';
import { DatePipe } from '@angular/common';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MissionComponent } from './mission/mission.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmployeeformComponent } from './employeeform/employeeform.component';



const routes: Routes = [
  {path: '', component: HomepageComponent },
  {path: 'employee', component: ListEmployeeComponent },
  {path: 'mission/missionEmployee', component: MissionComponent},
  {path: 'employee/exp', component: EmployeeformComponent},
  {path: 'employee/skill', component: SkillComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    PhoneNumberPipe,
    SkillComponent,
    ArrayStringPipe,
    NavbarComponent,
    HomepageComponent,
    MissionComponent,
    EmployeeformComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true , onSameUrlNavigation:'reload'}),
    MatProgressSpinnerModule
  ],
  exports:[ RouterModule],
  providers: [PhoneNumberPipe, DatePipe, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

