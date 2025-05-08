import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyGridListComponent } from './property-grid-list.component';
import { PropertyGridListItemComponent } from './property-grid-list-item/property-grid-list-item.component';
import { ButtonModule } from '../button/button.module';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItemModule } from '../menu-item/menu-item.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { DeleteThisPropertyDialogModule } from '../confirmation-dialog/confirmation-dialog.module';
import { RouterModule } from '@angular/router';
import { EvaluationStatusModule } from '../evaluation-status/evaluation-status.module';

@NgModule({
  declarations: [PropertyGridListComponent, PropertyGridListItemComponent],
  exports: [PropertyGridListComponent],
  imports: [
    CommonModule,
    ButtonModule,
    MatMenuModule,
    MenuItemModule,
    MatGridListModule,
    DeleteThisPropertyDialogModule,
    RouterModule,
    EvaluationStatusModule,
  ],
})
export class PropertyGridListModule {}
