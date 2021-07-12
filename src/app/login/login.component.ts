import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  passMatch: boolean = true;

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(params) {
    console.log(params, this.form.value.username, this.form.value.password);
    this.passMatch = this.form.value.username === 'Angular' && this.form.value.password === 'Casestudy';
    if (this.passMatch) {
      localStorage.setItem('SeesionUser', 'Angular');
      this.route.navigate(['emp']);
    } else {
      this.route.navigate(['login']);
      alert('Please enter valid username and password');
    }
  }
}
