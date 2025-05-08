import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IOptionField } from 'src/app/interfaces/IOptionField';
import { IFormPlan } from 'src/app/interfaces/IFormPlan';
import { AutoUnsubscribeComponent } from '../auto-unsubscribe/auto-unsubscribe.component';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss'],
  host: {
    '[class.isReview]': 'isReview',
    '[class.showRadioOnMobile]': 'showRadioOnMobile',
  },
})
export class PlanCardComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  @Input() isPremiumPlan = false;
  @Input() showRadioOnMobile = false;
  @Input() isReview = false;
  @Input() formControl: FormControl = new FormControl();
  @Input() formControlSettings?: FormGroup;

  option: IOptionField = {
    label: '',
    key: '',
  };

  plan = '';
  optionList: {
    label: string;
    isActive: boolean;
  }[] = [];
  costPerYear = '';
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
    } else {
      this.plan = '';
      this.optionList = [];
      this.costPerYear = '';
    }
  }

  public ngOnChanges(changes: any): void {
    if (
      changes.hasOwnProperty('formControlSettings') &&
      this.formControlSettings
    ) {
      this.configChange(this.formControlSettings.value);
    }
  }

  configChange(newValue: IFormPlan) {
    this.option = {
      label: newValue.plan,
      key: newValue.id,
    };
    this.plan = newValue.plan;
    this.isPremiumPlan = this.plan.toLowerCase() === 'premium plan';
    this.optionList = newValue.features.map((item) => ({
      isActive: false,
      label: item,
    }));
    this.optionList.unshift({
      label: `${newValue.pricePointsNumber} price points`,
      isActive: this.isPremiumPlan,
    });
    this.costPerYear = `$${newValue.costPerYear}/year`;
  }

  nextStep(): void {
    this.formControl.setValue(this.option.key);
  }
}
