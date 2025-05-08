import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricePointsSummaryRightComponent } from './price-points-summary-right.component';
import { PricePointsSummaryModule } from '../price-points-summary/price-points-summary.module';

@NgModule({
  declarations: [PricePointsSummaryRightComponent],
  exports: [PricePointsSummaryRightComponent],
  imports: [CommonModule, PricePointsSummaryModule],
})
export class PricePointsSummaryRightModule {}
