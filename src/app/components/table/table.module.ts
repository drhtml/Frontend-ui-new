import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { CellActionsComponent } from './cells/cell-actions/cell-actions.component';
import { ButtonModule } from '../button/button.module';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItemModule } from '../menu-item/menu-item.module';
import { CellUserInfoComponent } from './cells/cell-user-info/cell-user-info.component';
import { CellEvaluationStatusListComponent } from './cells/cell-evaluation-status-list/cell-evaluation-status-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CellEvaluationStatusCollapseComponent } from './cells/cell-evaluation-status-collapse/cell-evaluation-status-collapse.component';
import { MatSortModule } from '@angular/material/sort';
import { PaginationComponent } from './pagination/pagination.component';
import { SelectFieldModule } from '../select-field/select-field.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CellActionsBottomComponent } from './cells/cell-actions-bottom/cell-actions-bottom.component';
import { CellEvaluationStatusModule } from '../cell-evaluation-status/cell-evaluation-status.module';

@NgModule({
  declarations: [
    TableComponent,
    CellActionsComponent,
    CellUserInfoComponent,
    CellEvaluationStatusListComponent,
    CellEvaluationStatusCollapseComponent,
    PaginationComponent,
    CellActionsBottomComponent,
  ],
  exports: [TableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    CheckboxModule,
    ButtonModule,
    MatMenuModule,
    MenuItemModule,
    MatTooltipModule,
    MatSortModule,
    SelectFieldModule,
    NgxPaginationModule,
    CellEvaluationStatusModule,
  ],
})
export class TableModule {}
