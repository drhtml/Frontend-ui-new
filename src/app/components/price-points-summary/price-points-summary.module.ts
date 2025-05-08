import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricePointsSummaryComponent } from './price-points-summary.component';

@NgModule({
  declarations: [PricePointsSummaryComponent],
  exports: [PricePointsSummaryComponent],
  imports: [CommonModule],
})
export class PricePointsSummaryModule {}
