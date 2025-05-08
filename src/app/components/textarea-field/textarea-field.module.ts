import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaFieldComponent } from './textarea-field.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TextareaFieldComponent],
  exports: [TextareaFieldComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class TextareaFieldModule {}
