import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!:FormGroup
  isSubmitted = false
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // this means that if an invalid if there is no value for the email
      email:['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get fc() {
    return this.loginForm.controls
  }

  submit() {
    this.isSubmitted = true
    if(this.loginForm.invalid) return

    alert(`email: ${this.fc.email.value},
    password: ${this.fc.password.value}`)
  }

}
