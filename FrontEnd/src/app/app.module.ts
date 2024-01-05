import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
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
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [
  {path: '', component: HomepageComponent },
  {path: 'employee', component: ListEmployeeComponent },
  {path: 'employee/add', component: AddEmployeeComponent},
  {path: 'employee/edit', component: EmployeeDetailComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    PhoneNumberPipe,
    SkillComponent,
    ArrayStringPipe,
    EmployeeDetailComponent,
    NavbarComponent,
    AddEmployeeComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true , onSameUrlNavigation:'reload'})
  ],
  exports:[ RouterModule],
  providers: [PhoneNumberPipe, DatePipe, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

