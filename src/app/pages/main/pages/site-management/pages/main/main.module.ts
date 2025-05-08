import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { UserAndPropertiesGridComponent } from './user-and-properties/user-and-properties-table/user-and-properties-grid/user-and-properties-grid.component';
import { UserAndPropertiesTableComponent } from './user-and-properties/user-and-properties-table/user-and-properties-table.component';
import { UserAndPropertiesComponent } from './user-and-properties/user-and-properties.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { BottomLinksModule } from 'src/app/components/bottom-links/bottom-links.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { DashboardBottomStatisticModule } from 'src/app/components/dashboard-bottom-statistic/dashboard-bottom-statistic.module';
import { InputFieldModule } from 'src/app/components/input-field/input-field.module';
import { KpiModule } from 'src/app/components/kpi/kpi.module';
import { MenuItemModule } from 'src/app/components/menu-item/menu-item.module';
import { SelectFieldModule } from 'src/app/components/select-field/select-field.module';
import { TableModule } from 'src/app/components/table/table.module';
import { ViewAsToggleModule } from 'src/app/components/view-as-toggle/view-as-toggle.module';
import { MainRoutingModule } from './main-routing.module';
import { PlanSettingsComponent } from './plan-settings/plan-settings.component';
import { PlanCardModule } from 'src/app/components/plan-card/plan-card.module';
import { PlanCardEditModule } from 'src/app/components/plan-card-edit/plan-card-edit.module';

@NgModule({
  declarations: [
    MainComponent,
    UserAndPropertiesComponent,
    UserAndPropertiesTableComponent,
    UserAndPropertiesGridComponent,
    PlanSettingsComponent,
  ],
  imports: [
    CommonModule,
    BottomLinksModule,
    MatTabsModule,
    KpiModule,
    DashboardBottomStatisticModule,
    InputFieldModule,
    SelectFieldModule,
    ViewAsToggleModule,
    TableModule,
    ButtonModule,
    MatMenuModule,
    MenuItemModule,
    MainRoutingModule,
    PlanCardModule,
    PlanCardEditModule,
  ],
})
export class MainModule {}
