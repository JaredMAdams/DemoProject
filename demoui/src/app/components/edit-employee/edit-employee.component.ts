import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employee: Employee = {
    employeeId: '',
    firstName: '',
    lastName: '',
    addresses: [{
      streetAddress: '',
      aptNumber: '',
      city: '',
      state: '',
      zipCode: '',
    }]
  }

  updatedEmployeeForm = new FormGroup({
    firstName: new FormControl(this.data.employee.firstName, [Validators.required]),
    lastName: new FormControl(this.data.employee.lastName, [Validators.required])
  }) 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EditEmployeeComponent>,
              private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employee = this.data.employee;
  }

  //Used for closing the edit employee dialog
  onClose() {
    this.dialogRef.close();
  }

  //Used to close the dialog and save any changes made
  //Ensures that all fields are valid, in this case, makes sure nothing is left empty
  saveChanges(e: any) {
    e.preventDefault();
    if(this.updatedEmployeeForm.valid) {
      this.employee.firstName = this.updatedEmployeeForm.value.firstName;
      this.employee.lastName = this.updatedEmployeeForm.value.lastName;
      this.employeeService.PostEmployee(this.employee).subscribe(() => {
        this.onClose();
      })
    }
  }
}
