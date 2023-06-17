import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interfaces/employee';
import { Address } from 'src/app/interfaces/address';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  //Checks to see if only one employee is being added.
  //If so, uses Post Employee to add that employee to the database, then closes its reference.
  //If there is more than one, uses PostMultipleEmployees function to add more than one employee at a time.
  //Both ways check to make sure that the entered employee is valid.
  createEmployeeModel(e: any) {
    e.preventDefault();
    if(this.employeeArray.length == 1) {
      
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
    else {
      this.employeeArray.splice(0,1);

      if(this.newEmployeeForm.valid) {
        this.setEmployee();
      } else {
        this.newEmployeeForm.markAllAsTouched();
      }

      this.employeeService.PostMultipleEmployees(this.employeeArray).subscribe((response) => {
        this.dialogRef.close(this.employeeArray);
      })
    }
  }

  //Checks to see if form is valid before creating a new form
  //If all checks pass, the setEmployee method is called, to save the entered employee.
  //The buildForm method is then called to dynamically build a new form for the next employee being entered
  //A new employeeModel and addressModel are then built for the same purpose
  addEmployee() {
    if(this.newEmployeeForm.valid) {
      this.setEmployee();
      this.buildForm();
      this.employeeModel = new EmployeeModel();
      this.addressModel = new AddressModel();
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

  //Dynamically builds a form group.
  //Allows for more than one employee to be entered at a time
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
