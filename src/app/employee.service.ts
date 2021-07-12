import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee/employee';
import { EmployeeComponent } from './employee/employee.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiURL = 'assets/data/employee.json';

  constructor(
    private http: HttpClient
  ) { }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiURL);
  }
}
