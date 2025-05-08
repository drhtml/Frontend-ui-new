import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadiosComponent } from './radios.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [RadiosComponent],
  exports: [RadiosComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    MatGridListModule,
    ReactiveFormsModule,
  ],
})
export class RadiosModule {}
