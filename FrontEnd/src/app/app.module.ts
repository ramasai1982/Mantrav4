import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { FormsModule } from '@angular/forms';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SkillComponent } from './skill/skill.component';
import { ArrayStringPipe } from './pipes/array-string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PhoneNumberPipe,
    SkillComponent,
    ArrayStringPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ],
  providers: [PhoneNumberPipe, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
