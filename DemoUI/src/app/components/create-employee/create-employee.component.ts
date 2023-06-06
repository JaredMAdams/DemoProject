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
      state: 'Alabama',
      zipCode: undefined,
    }]
  }

  employees: Employee[] = [{
    firstName: '',
    lastName: '',
    addresses: [{
      streetAddress: undefined,
      aptNumber: undefined,
      city: undefined,
      state: 'Alabama',
      zipCode: undefined,
    }]
  }]

  address: Address = {
    streetAddress: '',
    aptNumber: '',
    city: '',
    state: '',
    zipCode: ''
  }

  newEmployeeForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    streetAddress: new FormControl('', [Validators.required]),
    aptNumber: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('Alabama', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern((/^[0-9\-]+$/))]),
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
    this.newEmployeeForm.value.firstName = '';
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

  createEmployee(e: any) {
    e.preventDefault();
    if(this.employees.length == 1){
      if(this.newEmployeeForm.valid) {
          
          this.employee.addresses?.splice(0,1);
          this.employee.firstName = this.newEmployeeForm.value.firstName!;
          this.employee.lastName = this.newEmployeeForm.value.lastName!;
          this.address.streetAddress = this.newEmployeeForm.value.streetAddress!;
          this.address.aptNumber = this.newEmployeeForm.value.aptNumber!;
          this.address.city = this.newEmployeeForm.value.city!;
          this.address.state = this.newEmployeeForm.value.state!;
          this.address.zipCode = this.newEmployeeForm.value.zipCode!;

          this.employee.addresses?.push(this.address);
          
          this.employeeService.PostEmployee(this.employee).subscribe(newEmployee => {
          this.dialogRef.close(this.employee);
          })
        } else {
          this.newEmployeeForm.markAllAsTouched();
        }
    }
    else {
      this.employeeService.PostMultipleEmployees(this.employees).subscribe((response) => {
        console.log(this.employees);
      })
    }
  }

  //Checks if employees is currently empty, if so, splices out the first (empty) entry
  //Then splices out previously entered address for new employee input
  //Saves employee info, pushes address into array, then pushes employee into the 'employees' array
  addAnotherEmployee() {
    if(this.employees.at(0)?.firstName == '') {
      this.employees.splice(0,1);
    }
    if(this.newEmployeeForm.valid) {
      this.employee.addresses?.splice(0,1);

      this.employee.firstName = this.newEmployeeForm.value.firstName!;
      this.employee.lastName = this.newEmployeeForm.value.lastName!;
      this.address.streetAddress = this.newEmployeeForm.value.streetAddress!;
      this.address.aptNumber = this.newEmployeeForm.value.aptNumber!;
      this.address.city = this.newEmployeeForm.value.city!;
      this.address.state = this.newEmployeeForm.value.state!;
      this.address.zipCode = this.newEmployeeForm.value.zipCode!;

      this.employee.addresses?.push(this.address);
    
      this.employees.push(this.employee);
    } else {
      this.newEmployeeForm.markAllAsTouched();
    }
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
