import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES:any = {
  required:'Should not be empty',
  email: 'Email is not valid'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input()
  control!:AbstractControl
  @Input()
  errorMessages: string[] = []
  showErrorsWhen:boolean = true
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation()
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation()
    })
    this.control.valueChanges.subscribe(() => {
      this.checkValidation()
    })
  }
  // now we're calling check validation in all change situations

  checkValidation() {
    const errors = this.control.errors
    if(!errors) {
      this.errorMessages = []
      return
    }

    const errorKeys = Object.keys(errors)
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key])
    // ['required', 'email'] //this will return "email is not valid"
  }
}
