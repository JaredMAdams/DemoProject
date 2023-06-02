import { Component, Inject, OnInit } from '@angular/core';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EditEmployeeComponent>,
              private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employee = this.data.employee;
    console.log(this.employee);
  }

  onClose() {
    this.dialogRef.close();
  }

  clearFirstName() {
    this.employee.firstName = '';
  }

  clearLastName() {
    this.employee.lastName = '';
  }

  saveChanges() {
    this.employeeService.PostEmployee(this.employee).subscribe(() => {
      this.onClose();
    })
  }

}
