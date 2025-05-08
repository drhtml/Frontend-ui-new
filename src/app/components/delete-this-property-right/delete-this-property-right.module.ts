import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteThisPropertyRightComponent } from './delete-this-property-right.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [DeleteThisPropertyRightComponent],
  exports: [DeleteThisPropertyRightComponent],
  imports: [CommonModule, ButtonModule],
})
export class DeleteThisPropertyRightModule {}
