import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { AddressListComponent } from './components/address-list/address-list.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    AddressListComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {
      close: (dialogResult: any) => {}
    }
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
