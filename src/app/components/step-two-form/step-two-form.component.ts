import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-two-form',
  templateUrl: './step-two-form.component.html',
  styleUrls: ['./step-two-form.component.scss']
})
export class StepTwoFormComponent implements OnInit {
  @Input() form: FormGroup<any> = new FormGroup({}) as any;
  @Input() shouldShowTitle = true;

  constructor() { }

  ngOnInit(): void {
  }

  getArrayControl(key: string): FormArray {
    return this.form.get(key) as FormArray;
  }

  getFormControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

}
