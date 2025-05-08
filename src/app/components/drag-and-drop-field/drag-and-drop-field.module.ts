import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropFieldComponent } from './drag-and-drop-field.component';
import { ButtonModule } from '../button/button.module';
import { DragAndDropRegionComponent } from './drag-and-drop-region/drag-and-drop-region.component';

@NgModule({
  declarations: [DragAndDropFieldComponent, DragAndDropRegionComponent],
  exports: [DragAndDropFieldComponent],
  imports: [CommonModule, ButtonModule],
})
export class DragAndDropFieldModule {}
