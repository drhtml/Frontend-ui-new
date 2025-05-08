import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-four-form',
  templateUrl: './step-four-form.component.html',
  styleUrls: ['./step-four-form.component.scss'],
})
export class StepFourFormComponent implements OnInit {
  @Input() form: FormGroup<any> = new FormGroup({
    cardholderName: new FormControl(),
    cardNumber: new FormControl(),
    expiredDate: new FormControl(),
    ccv: new FormControl(),
    saveMyPayment: new FormControl(),
  }) as any;

  constructor() {}

  ngOnInit(): void {}

  getControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }
}
