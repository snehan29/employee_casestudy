import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeList: any[];
  id;
  form: FormGroup;
  details: boolean = false;
  heading;
  employee;

  constructor(
    private empService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.empService.getEmployees().subscribe((res) => {
      this.employeeList = res;
    });
    this.form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      empId: new FormControl('', Validators.required, Validators.pattern[0 - 9]),
      lastname: new FormControl('', Validators.required),
      age: new FormControl('', Validators.pattern[0 - 9]),
      email: new FormControl('', Validators.email)
    });
  }

  onUpdate(param) {
    this.id = param['id'];
    this.details = true;
    this.heading = 'Update Employee';
    this.setformValues(this.id);
    this.form.enable();
    this.form.controls.empId.disable();
  }

  onDel(param) {
    this.id = param['id'];
    this.employeeList.splice(this.id - 1, 1);
    console.log(this.employeeList);
  }

  onDetails(param) {
    this.id = param['id'];
    this.heading = 'Employee Details';
    this.details = true;
    this.setformValues(this.id);
    this.form.disable();
  }

  onAdd() {
    this.heading = 'New Employee';
    this.form.enable();
    this.details = true;    
    this.form.controls.firstname.setValue('');
    this.form.controls.empId.setValue('');
    this.form.controls.lastname.setValue('');
    this.form.controls.age.setValue('');
    this.form.controls.email.setValue('');
  }

  setformValues(id) {
    this.form.controls.empId.setValue(this.employeeList[id - 1].id);
    this.form.controls.firstname.setValue(this.employeeList[id - 1].firstName);
    this.form.controls.lastname.setValue(this.employeeList[id - 1].lastName);
    this.form.controls.age.setValue(this.employeeList[id - 1].age);
    this.form.controls.email.setValue(this.employeeList[id - 1].email);
  }

  onSubmit(params) {
    this.employee = { id: this.form.controls.empId.value, firstName: this.form.controls.firstname.value, lastName: this.form.controls.lastname.value, age: this.form.controls.age.value, email: this.form.controls.email.value };
    this.employeeList[this.form.controls.empId.value - 1] = this.employee;
  }
}
