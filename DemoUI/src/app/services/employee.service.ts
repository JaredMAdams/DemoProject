import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../interfaces/employee';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  baseUrl =  `${environment.baseUrl}/employees`

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  GetEmployee(objectId: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/` + objectId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  GetEmployeesByState(state: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/state/` + state, {headers: environment.headers, withCredentials: environment.withCredentials})
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  GetEmployeesByCity(city: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/city/` + city, {headers: environment.headers, withCredentials: environment.withCredentials})
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  GetEmployeesByZipCode(zipCode: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/zip-code/` + zipCode, {headers: environment.headers, withCredentials: environment.withCredentials})
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  GetEmployeesByFirstName(firstName: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/first-name/` + firstName, {headers: environment.headers, withCredentials: environment.withCredentials})
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  GetEmployeesByLastName(lastName: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/last-name/` + lastName, {headers: environment.headers, withCredentials: environment.withCredentials})
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  GetAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}`, {headers: environment.headers, withCredentials: environment.withCredentials})
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  PostEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}`, JSON.stringify(employee), {headers: environment.headers, withCredentials: environment.withCredentials})
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  PostMultipleEmployees(employees: Employee[]): Observable<Employee[]> {
    return this.http.post<Employee[]>(`${this.baseUrl}/executor`, JSON.stringify(employees), {headers: environment.headers, withCredentials: environment.withCredentials})
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  deleteEmployee(objectId: string) {
    return this.http.delete<Employee>(`${this.baseUrl}/` + objectId, {headers: environment.headers, withCredentials: environment.withCredentials})
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
