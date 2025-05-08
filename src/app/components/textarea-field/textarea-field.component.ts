import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss'],
})
export class TextareaFieldComponent implements OnInit {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() formControl: FormControl<any> = new FormControl();

  constructor() {}

  ngOnInit(): void {}

  get errorMessage(): string {
    if (!this.formControl.dirty && !this.formControl.touched) {
      return '';
    }
    if (this.formControl.errors?.['email']) {
      return 'Invalid email.';
    }
    if (this.formControl.errors?.['required']) {
      return 'Field is required.';
    }
    if (this.formControl.errors?.['phoneNumber']) {
      return 'Invalid phone number.';
    }
    return '';
  }
}
