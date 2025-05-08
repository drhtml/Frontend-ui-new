import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricePointsSummaryDialogComponent } from './price-points-summary-dialog.component';
import { PricePointsSummaryModule } from '../price-points-summary/price-points-summary.module';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [PricePointsSummaryDialogComponent],
  exports: [PricePointsSummaryDialogComponent],
  imports: [CommonModule, PricePointsSummaryModule, ButtonModule],
})
export class PricePointsSummaryDialogModule {}
