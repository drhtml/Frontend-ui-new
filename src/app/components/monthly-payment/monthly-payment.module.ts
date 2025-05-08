import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyPaymentComponent } from './monthly-payment.component';
import { InputFieldModule } from '../input-field/input-field.module';

@NgModule({
  declarations: [MonthlyPaymentComponent],
  exports: [MonthlyPaymentComponent],
  imports: [CommonModule, InputFieldModule],
})
export class MonthlyPaymentModule {}
