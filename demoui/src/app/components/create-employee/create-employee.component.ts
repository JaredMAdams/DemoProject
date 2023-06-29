import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interfaces/employee';
import { Address } from 'src/app/interfaces/address';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from 'src/app/models/employee.model';
import { AddressModel } from 'src/app/models/address.model';
import { States } from 'src/app/enums/states.enum';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeModel = new EmployeeModel();
  addressModel = new AddressModel();

  employeeArray: Employee[] = [];
  addressArray: Address[] = []
  
  //Instantiates our enum
  public states = Object.values(States);

  newEmployeeForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<EmployeeListComponent>,
              private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeArray.push(this.employeeModel);
    this.addressArray.push(this.addressModel);
    this.buildForm();
  }

  //Closes the dialog without making any changes to the database
  onClose() {
    this.employeeModel.firstName = '';
    this.dialogRef.close(this.employeeModel);
  }

  //The entered form is checked against validators, to make sure no required info is missing
  //If all checks are passed, the SetEmployee method is called
  //The newly set employee is then posted via the PostEmployee method and the dialog is closed
  //If any checks did not pass, the invalid fields are marked as touched, and an error message is given to the user
  createEmployeeModel(e: any) {
    e.preventDefault();
    
    if(this.newEmployeeForm.valid) {
      this.employeeArray.splice(0, 1);
      this.setEmployee();
      
      this.employeeService.PostEmployee(this.employeeModel).subscribe(newEmployee => {
        this.dialogRef.close(this.employeeArray);
      })
    } else {
        this.newEmployeeForm.markAllAsTouched();
    }
  }

  //Once a method has validated that the form group passes all requirements, this method sets the employee model to the entered values, and then pushes into our data array
  setEmployee() {
      this.employeeModel.firstName = this.newEmployeeForm.value.firstName!;
      this.employeeModel.lastName = this.newEmployeeForm.value.lastName!;
      this.addressModel.streetAddress = this.newEmployeeForm.value.streetAddress!;
      this.addressModel.aptNumber = this.newEmployeeForm.value.aptNumber!;
      this.addressModel.city = this.newEmployeeForm.value.city!;
      this.addressModel.state = this.newEmployeeForm.value.state!;
      this.addressModel.zipCode = this.newEmployeeForm.value.zipCode!;

      this.employeeModel.addresses.push(this.addressModel); 

      this.employeeArray.push(this.employeeModel);
  }

  //Dynamically builds a form group when the dialog is initialized
  //Allows for validation of fields
  buildForm() {
    this.newEmployeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      streetAddress: new FormControl('', [Validators.required]),
      aptNumber: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('Alabama', [Validators.required]),
      zipCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern((/^[0-9\-]+$/))])
    })
  }
}