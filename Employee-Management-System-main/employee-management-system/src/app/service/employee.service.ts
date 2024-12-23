import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  addEmpURL: string;
  getEmpURL: string;
  updateEmpURL: string;

  constructor(private http: HttpClient) {
    this.addEmpURL = 'http://localhost:8080/emp/addEmployee';
    this.getEmpURL = 'http://localhost:8080/emp/getAll';
    this.updateEmpURL = 'http://localhost:8080/emp/updateEmployee';
  }

  addEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.addEmpURL, emp);
  }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.getEmpURL);
  }

  updateEmployee(emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.updateEmpURL,emp);
}
}
