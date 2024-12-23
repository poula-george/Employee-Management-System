import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  providers: [EmployeeService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  empDetail!: FormGroup;
  empObj: Employee = new Employee();
  empList: Employee[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService
  ) {}
  ngOnInit(): void {
    this.getAllEmployee();

    this.empDetail = this.formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      salary: [''],
    });
  }

  addEmployee(): void {
    console.log(this.empDetail.value);
    this.empObj.id = this.empDetail.value.id;
    this.empObj.name = this.empDetail.value.name;
    this.empObj.salary = this.empDetail.value.salary;
    this.empObj.email = this.empDetail.value.email;

    this.empService.addEmployee(this.empObj).subscribe(
      (res) => {
        console.log(res);
        this.getAllEmployee();
      },
      (error) => {
        console.error('Error Adding Employee', error);
      }
    );
  }

  getAllEmployee() {
    this.empService.getAllEmployee().subscribe(
      (res) => {
        this.empList = res;
      },
      (err) => {
        console.log('Error while fetching data', err);
      }
    );
  }

  editEmployee(emp: Employee) {
    this.empDetail.controls['id'].setValue(emp.id);
    this.empDetail.controls['name'].setValue(emp.name);
    this.empDetail.controls['email'].setValue(emp.email);
    this.empDetail.controls['salary'].setValue(emp.salary);

  }

  updateEmployee() {
    this.empObj.id = this.empDetail.value.id;
    this.empObj.name = this.empDetail.value.name;
    this.empObj.salary = this.empDetail.value.salary;
    this.empObj.email = this.empDetail.value.email;
  
    this.empService.updateEmployee(this.empObj).subscribe(res=>{
      console.log(res);
      this.getAllEmployee();
    },err=>{
      console.log(err);
    })
  }
}
