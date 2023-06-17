import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interfaces/employee';
import { Address } from 'src/app/interfaces/address';
import { EditAddressComponent } from '../edit-address/edit-address.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { States } from 'src/app/enums/states.enum';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  displayedColumns: string[] = ['number', 'street_address', 'apt_number', 'city', 'state', 'zip_code', 'edit', 'delete'];
  addressSpecs: boolean = false;

  public states = Object.values(States);

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

  newAddressForm = new FormGroup({
    streetAddress: new FormControl('', [Validators.required]),
    aptNumber: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('Alabama', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern((/^[0-9\-]+$/))])
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EmployeeListComponent>,
              private employeeService: EmployeeService,
              private dialog: MatDialog){ 
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

  //deletes address at position i from array, renders rows of table to show update in real time.
  deleteAddress(i: number) {
    this.data.employee.addresses.splice(i, 1);
    this.table.renderRows();
  }

  //Sets boolean to true, showing new options for adding an address to an employee
  addAddress() {
    this.addressSpecs = true;
  }

  //Sets boolean to false, removing additional options in view
  cancelAddAddress() {
    this.addressSpecs = false;
  }

  //Checks if newly added address is valid
  //If it is, adds address to current array
  //Then saves the employee with the updated array
  //Renders rows to show newly updated info
  //Sets addressSpecs to false, to remove additional clutter from view.
  saveAddress(e: any) {
    e.preventDefault;
    if(this.newAddressForm.valid) {
      this.newAddress.streetAddress = this.newAddressForm.value.streetAddress!;
      this.newAddress.aptNumber = this.newAddressForm.value.aptNumber!;
      this.newAddress.city = this.newAddressForm.value.city!;
      this.newAddress.state = this.newAddressForm.value.state!;
      this.newAddress.zipCode = this.newAddressForm.value.zipCode!;

      this.data.employee.addresses.push(this.newAddress);
      this.employeeService.PostEmployee(this.employee).subscribe();
      this.table.renderRows();
      this.addressSpecs = false;
    }
  }

  //Saves all made changes (Such as deleting an address)
  saveChanges() {
    this.employeeService.PostEmployee(this.employee).subscribe();
    this.dialogRef.close();
  }

  //Opens Dialog and configures options
  //After closing, updates address to reflect changes
  editAddress(address: Address, i: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "50%";
    dialogConfig.width = "40%";
    dialogConfig.data = {
      address: address,
      position: i
    }
    let dialogRef = this.dialog.open(EditAddressComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((updatedAddress: Address) => {
      if(updatedAddress.streetAddress != '') {
        address.streetAddress = updatedAddress.streetAddress;
        address.aptNumber = updatedAddress.aptNumber;
        address.city = updatedAddress.city;
        address.state = updatedAddress.state;
        address.zipCode = updatedAddress.zipCode;
      }
      
    })
  }
}