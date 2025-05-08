import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { CheckboxModule } from '../checkbox/checkbox.module';

@NgModule({
  declarations: [CheckboxGroupComponent],
  exports: [CheckboxGroupComponent],
  imports: [CommonModule, CheckboxModule],
})
export class CheckboxGroupModule {}
