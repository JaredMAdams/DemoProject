import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeService } from '../../services/employee.service';
import * as XLSX from 'xlsx';
import { EmployeeModel } from '../../models/employee.model';
import { AddressModel } from '../../models/address.model';
import { Employee } from '../../interfaces/employee';
import { Address } from '../../interfaces/address';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent implements OnInit {

  displayedColumns: string[] = ['number',  
                                'first_name', 
                                'last_name', 
                                'street_address', 
                                'apt_number', 
                                'city', 
                                'state', 
                                'zip_code'
  ];

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  dataSource!: MatTableDataSource<Employee>;
  
  ExcelData: any;
  hidePaginator: boolean = true;

  employeeModel = new EmployeeModel();
  addressModel = new AddressModel();

  employeeArray: Employee[] = [];
  addressArray: Address[] = []

  constructor(public dialogRef: MatDialogRef<EmployeeListComponent>,
              private employeeService: EmployeeService) {}

  ngOnInit(): void {}

  onClose() {
    this.employeeArray.splice(0);
    this.dialogRef.close(this.employeeArray);
  }

  //Iterates through excel file, creating an array based on rows from the excel file
  //The setEmployee method is then called, assigning values to an array of employee objects based on the iterated array
  //The employeeArray is spliced when this is first called, in case the user originally selects the wrong file
  //This prevents the originial files data from being uploaded
  ReadExcel(event: any){

    this.dataSource = new MatTableDataSource(this.ExcelData);
    this.dataSource.paginator = this.paginator;
    
    this.employeeArray.splice(0);
    
    let file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, {type : 'binary'});
      var sheetNames = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

      for(let row of this.ExcelData) {
        this.dataSource.paginator = this.paginator;
        this.setEmployee(row);
        this.employeeModel = new EmployeeModel();
        this.addressModel = new AddressModel();
        
      }

      this.hidePaginator = false;

      this.dataSource = new MatTableDataSource(this.ExcelData);
      this.dataSource.paginator = this.paginator;
    }
  }

  //Sets the values from the Excel sheet into an employee/address model for each given object
  setEmployee(row: any) {
    this.employeeModel.firstName = row.First_Name;
    this.employeeModel.lastName = row.Last_Name;
    this.addressModel.streetAddress = row.Street_Address;
    this.addressModel.aptNumber = row.Apt_Number;
    this.addressModel.city = row.City;
    this.addressModel.state = row.State;
    this.addressModel.zipCode = row.Zip_Code;

    this.employeeModel.addresses.push(this.addressModel); 

    this.employeeArray.push(this.employeeModel);
  }

  //Calls the PostMultipleEmployees method to save multiple entries at once
  saveEmployees() {
    this.employeeService.PostMultipleEmployees(this.employeeArray).subscribe(() => {
      this.dialogRef.close(this.employeeArray);
    })
  }

}