import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingModalComponent } from './loading-modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [LoadingModalComponent],
  exports: [LoadingModalComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class LoadingModalModule {}
