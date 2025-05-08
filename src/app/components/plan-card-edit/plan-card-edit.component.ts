import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { IFormPlan } from 'src/app/interfaces/IFormPlan';
import { AutoUnsubscribeComponent } from '../auto-unsubscribe/auto-unsubscribe.component';

@Component({
  selector: 'app-plan-card-edit',
  templateUrl: './plan-card-edit.component.html',
  styleUrls: ['./plan-card-edit.component.scss'],
})
export class PlanCardEditComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  @Input() isPremiumPlan = false;
  @Input() formControlSettings?: FormGroup;
  @Output() removeThisPlan = new EventEmitter();
  optionList: {
    label: string;
    isActive: boolean;
  }[] = [];
  constructor() {
    super();
  }

  ngOnInit(): void {
    if (this.formControlSettings) {
      this.configChange(this.formControlSettings.value);
      this.addSubscriptions(
        this.formControlSettings.valueChanges.subscribe((values) => {
          this.configChange(values);
        })
      );
    }
  }

  configChange(newValue: IFormPlan) {
    const plan = newValue.plan;
    this.isPremiumPlan = plan.toLowerCase() === 'premium plan';
  }

  getControl(key: string): FormControl {
    return this.formControlSettings?.get(key) as FormControl;
  }

  abstractControlToControl(object: AbstractControl): FormControl {
    return object as FormControl;
  }

  getControlArray(key: string): FormArray {
    return this.formControlSettings?.get(key) as FormArray;
  }

  removeFeatureAtIndex(index: number): void {
    this.getControlArray('features').removeAt(index);
  }

  addFeature(): void {
    this.getControlArray('features').push(new FormControl());
  }
}
