import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { merge } from 'rxjs';
import { IResponseProperty } from 'src/app/interfaces/backendResponse/IResponseProperty';
import { convertStringToNumber, isNumber } from 'src/app/utils/string';

@Component({
  selector: 'app-monthly-payment',
  templateUrl: './monthly-payment.component.html',
  styleUrls: ['./monthly-payment.component.scss'],
  host: {
    '[class.isNotEdit]': '!isEdit',
  },
})
export class MonthlyPaymentComponent implements OnInit {
  @Input() showTitle = true;
  @Input() isEdit = true;

  principalAndInterestPercent = '0%';
  propertyTaxPercent = '0%';
  homeInsurancePercent = '0%';
  HOAFeesPercent = '0%';
  utilitiesPercent = '0%';
  @Input() propertyData?: IResponseProperty;

  @Input() form: FormGroup<any> = new FormGroup({
    principalAndInterest: new FormControl(),
    propertyTax: new FormControl(),
    homeInsurance: new FormControl(),
    HOAFees: new FormControl(),
    utilities: new FormControl(),
    totalDue: new FormControl(),
    downPaymentAtClose: new FormControl(),
  }) as any;

  constructor() {}

  ngOnInit(): void {
    merge(
      this.getFormControl('principalAndInterest').valueChanges,
      this.getFormControl('propertyTax').valueChanges,
      this.getFormControl('homeInsurance').valueChanges,
      this.getFormControl('HOAFees').valueChanges,
      this.getFormControl('utilities').valueChanges
    ).subscribe(() => {
      this.updateChartUI();
    });
  }

  updateChartUI() {
    const principalAndInterest = convertStringToNumber(
      this.getFormControl('principalAndInterest').value
    );
    const propertyTax = convertStringToNumber(
      this.getFormControl('propertyTax').value
    );
    const homeInsurance = convertStringToNumber(
      this.getFormControl('homeInsurance').value
    );
    const HOAFees = convertStringToNumber(this.getFormControl('HOAFees').value);
    const utilities = convertStringToNumber(
      this.getFormControl('utilities').value
    );

    let total =
      principalAndInterest + propertyTax + homeInsurance + HOAFees + utilities;
    if (total === 0) {
      total = 1;
    }
    this.principalAndInterestPercent = `${
      (principalAndInterest * 100.0) / total
    }%`;
    this.propertyTaxPercent = `${(propertyTax * 100.0) / total}%`;
    this.homeInsurancePercent = `${(homeInsurance * 100.0) / total}%`;
    this.HOAFeesPercent = `${(HOAFees * 100.0) / total}%`;
    this.utilitiesPercent = `${(utilities * 100.0) / total}%`;
  }

  getFormControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      this.form.patchValue({
        principalAndInterest: this.propertyData.monthlyPayment?.principalAndInterest,
        propertyTax: this.propertyData.monthlyPayment?.propertyTax,
        homeInsurance: this.propertyData.monthlyPayment?.homeInsurance,
        HOAFees: this.propertyData.monthlyPayment?.hoaFees,
        utilities: this.propertyData.monthlyPayment?.utilities,
        totalDue: this.propertyData.monthlyPayment?.total,
        downPaymentAtClose: this.propertyData.monthlyPayment?.downPayment,
      })
    }
  }
}
