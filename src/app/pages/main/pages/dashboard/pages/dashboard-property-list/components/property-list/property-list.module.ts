import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyListComponent } from './property-list.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { TableModule } from 'src/app/components/table/table.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { PropertyGridListModule } from 'src/app/components/property-grid-list/property-grid-list.module';
import { ViewAsToggleModule } from 'src/app/components/view-as-toggle/view-as-toggle.module';
import { EmptyListComponent } from './components/empty-list/empty-list.component';

@NgModule({
  declarations: [PropertyListComponent, TableListComponent, EmptyListComponent],
  exports: [PropertyListComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    MatGridListModule,
    PropertyGridListModule,
    ViewAsToggleModule,
  ],
})
export class PropertyListModule {}
