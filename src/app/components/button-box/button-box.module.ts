import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBoxComponent } from './button-box.component';

@NgModule({
  declarations: [ButtonBoxComponent],
  exports: [ButtonBoxComponent],
  imports: [CommonModule],
})
export class ButtonBoxModule {}
