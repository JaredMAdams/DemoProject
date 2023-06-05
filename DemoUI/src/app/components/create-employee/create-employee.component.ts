import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interfaces/employee';
import { Address } from 'src/app/interfaces/address';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  newEmployeeForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    streetAddress: new FormControl('', [Validators.required]),
    aptNumber: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

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

  // clearStreetAddress(i: number) {
  //   this.employee.addresses?.streetAddress = undefined;
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
