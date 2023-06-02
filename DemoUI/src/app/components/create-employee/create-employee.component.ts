import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interfaces/employee';
import { Address } from 'src/app/interfaces/address';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = {
    firstName: '',
    lastName: '',
    addresses: [{
      streetAddress: undefined,
      aptNumber: undefined,
      city: undefined,
      state: '',
      zipCode: undefined,
    }]
  }

  constructor(public dialogRef: MatDialogRef<EmployeeListComponent>,
              private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  onClose() {
    this.employee.firstName = '';
    this.dialogRef.close(this.employee);
  }

  clearFirstName() {
    this.employee.firstName = '';
  }

  clearLastName() {
    this.employee.lastName = '';
  }

  // clearStreetAddress() {
  //   this.employee.addresses.streetAddress = undefined;
  // }

  // clearAptNumber() {
  //   this.address.aptNumber = undefined;
  // }

  // clearCity() {
  //   this.address.city = undefined;
  // }

  // clearState() {
  //   this.address.state = undefined;
  // }

  // clearZipCode() {
  //   this.address.zipCode = undefined;
  // }

  createEmployee() {
    this.employeeService.PostEmployee(this.employee).subscribe(newEmployee => {
      this.dialogRef.close(this.employee);
    })
  }
}
