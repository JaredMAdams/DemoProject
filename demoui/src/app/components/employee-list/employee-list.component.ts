import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { AddressListComponent } from '../address-list/address-list.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { States } from 'src/app/enums/states.enum';
import { BulkUploadComponent } from 'src/app/components/bulk-upload/bulk-upload.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['number', 'id', 'first_name', 'last_name', 'addresses', 'edit', 'delete']

  public states = Object.values(States);

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  hidePaginator: boolean = true;

  employees: Employee[] = [];

  name: Employee = {
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
  };

  employee: Employee = {
    employeeId: '',
    firstName: '',
    lastName: '',
    addresses: [{
      streetAddress: undefined,
      aptNumber: undefined,
      city: undefined,
      state: undefined,
      zipCode: undefined,
    }]
  }

  //Datasource for table
  dataSource!: MatTableDataSource<Employee>;
  //String that represents how the user is attempting to search
  searchBy: string = 'All';
  //User Input for search function.  Parameter for search function
  searchParam: string = '';
  searchParamState: string = 'Alabama';

  constructor(public dialogRef: MatDialogRef<EmployeeListComponent>, 
              private dialog: MatDialog, 
              private employeeService: EmployeeService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.GetEmployees();
  }

  //opens mat dialog
  //sends employee data based on index clicked from mat table
  viewAddresses(employee: Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "80%";
    dialogConfig.width = "80%";
    dialogConfig.data = {
      employee: employee
    };
    let dialogRef =this.dialog.open(AddressListComponent, dialogConfig);
  }

  //Setting configuration for the "create-employee" component
  //Creates new employee to add to system
  //After the dialog reference is closed, loops through returned array of users, adding them to existing employees array
  //The datasource is then reset to the new array containing all added items
  //This allows the UI to update without the need to refresh the page in order to see new data
  createEmployee() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "60%";
    dialogConfig.width = "60%";
    let dialogRef = this.dialog.open(CreateEmployeeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((newEmployee: Employee[]) => {
      if(newEmployee.length > 0) {
        for(let employee of newEmployee) {
          this.employees.push(employee);
        }
        this.hidePaginator = false;
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  bulkUploadEmployees() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "80%";
    dialogConfig.width = "100%";
    let dialogRef = this.dialog.open(BulkUploadComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((newEmployee: Employee[]) => {
      if(newEmployee.length > 0) {
        for(let employee of newEmployee) {
          this.employees.push(employee);
        }
        this.hidePaginator = false;
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  //Edit existing name of employee in list
  editEmployee(employee: Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "30";
    dialogConfig.width = "50%";
    dialogConfig.data = {
      employee: employee
    }
    let dialogRef = this.dialog.open(EditEmployeeComponent, dialogConfig);
  }

  //Deletes an employee from the list
  //Splices that data from employees array
  //Updates DataSource and paginator to reflect new employees array
  deleteEmployee(employeeId: string, i: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      this.employees.splice(i, 1);
      if(this.employees.length == 0) {
        this.hidePaginator = true;
      }
      this.dataSource = new MatTableDataSource(this.employees);
      this.dataSource.paginator = this.paginator;
    })
  }

  //Searches DB based on searchBy variable
  searchEmployees() {
    switch(this.searchBy) {
      case 'First Name': {
        this.GetEmployeesByFirstName();
        break;
      }
      case 'Last Name': {
        this.GetEmployeesByLastName();
        break;
      }
      case 'All': {
        this.GetEmployees();
        break;
      }
      case 'State': {
        this.GetEmployeesByState();
        break;
      }
      case 'City': {
        this.GetEmployeesByCity();
        break;
      }
      case 'Zip Code': {
        this.GetEmployeesByZipCode();
        break;
      }
    }
  }

  //gets full list of employees
  //paginates list
  GetEmployees() {
    this.employeeService.GetAllEmployees().subscribe((list: Employee[]) =>
    {
      this.employees = list;
      if(list.length > 0) {
        this.hidePaginator = false;
      }

      this.dataSource = new MatTableDataSource(this.employees);
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
      
    })    
  }

  //Search Function by First Name
  //Updates datasource based on new list obtained from database
  GetEmployeesByFirstName() {
    this.employeeService.GetEmployeesByFirstName(this.searchParam).subscribe((newList: Employee[]) => {
      this.employees = newList;
      this.dataSource = new MatTableDataSource(this.employees);
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
    })
  }

  //Search Function by Last Name
  //Updates datasource based on new list obtained from database
  GetEmployeesByLastName() {
    this.employeeService.GetEmployeesByLastName(this.searchParam).subscribe((newList: Employee[]) => {
      this.employees = newList;
      this.dataSource = new MatTableDataSource(this.employees);
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
    })
  }

  //Search Function by State
  //Updates datasource based on new list obtained from database
  GetEmployeesByState() {
    this.employeeService.GetEmployeesByState(this.searchParamState).subscribe((newList: Employee[]) => {
      this.employees = newList;
      this.dataSource = new MatTableDataSource(this.employees);
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
    })
  }

  //Search Function by City
  //Updates datasource based on new list obtained from database
  GetEmployeesByCity() {
    this.employeeService.GetEmployeesByCity(this.searchParam).subscribe((newList: Employee[]) => {
      this.employees = newList;
      this.dataSource = new MatTableDataSource(this.employees);
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
    })
  }

  //Search Function by Zip Code
  //Updates datasource based on new list obtained from database
  GetEmployeesByZipCode() {
    this.employeeService.GetEmployeesByZipCode(this.searchParam).subscribe((newList: Employee[]) => {
      this.employees = newList;
      this.dataSource = new MatTableDataSource(this.employees);
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
    })
  }
}
