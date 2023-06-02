import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interfaces/employee';
import { Address } from 'src/app/interfaces/address';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  displayedColumns: string[] = ['number', 'street_address', 'apt_number', 'city', 'state', 'zip_code', 'delete'];
  addressSpecs: boolean = false;

  @ViewChild(MatTable) table!: MatTable<any>;

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

  newAddress: Address = {
    streetAddress: '',
    aptNumber: '',
    city: '',
    state: '',
    zipCode: ''
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EmployeeListComponent>,
              private employeeService: EmployeeService){ 
  }

  ngOnInit(): void {
    for(let address of this.data.employee.addresses) {
      if(address.streetAddress == null) {
        this.data.employee.addresses.splice(address, 1);
      }
    }
    this.employee = this.data.employee;
  }

  onClose() {
    this.dialogRef.close();
  }

  deleteAddress(i: number) {
    this.data.employee.addresses.splice(i, 1);
    this.table.renderRows();
  }

  addAddress() {
    this.addressSpecs = true;
  }

  saveAddress() {
    this.employeeService.PostEmployee(this.employee).subscribe();
    this.data.employee.addresses.push(this.newAddress);
    this.table.renderRows();
    this.addressSpecs = false;
  }

  saveChanges() {
    this.employeeService.PostEmployee(this.employee).subscribe();
    this.dialogRef.close();
  }
}