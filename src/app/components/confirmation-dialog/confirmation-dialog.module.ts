import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  exports: [ConfirmationDialogComponent],
  imports: [CommonModule, ButtonModule],
})
export class DeleteThisPropertyDialogModule {}
