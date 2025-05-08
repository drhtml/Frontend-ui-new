import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerComponent } from './divider.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [DividerComponent],
  exports: [DividerComponent],
  imports: [CommonModule, MatDividerModule],
})
export class DividerModule {}
