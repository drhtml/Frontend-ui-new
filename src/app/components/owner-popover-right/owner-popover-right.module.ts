import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerPopoverRightComponent } from './owner-popover-right.component';
import { ButtonModule } from '../button/button.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OwnerPopoverRightComponent],
  exports: [OwnerPopoverRightComponent],
  imports: [CommonModule, ButtonModule, RouterModule],
})
export class OwnerPopoverRightModule {}
