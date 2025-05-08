import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DasbhoardRoutingModule } from './dashboard-routing.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { BottomLinksModule } from 'src/app/components/bottom-links/bottom-links.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { KpiModule } from 'src/app/components/kpi/kpi.module';
import { DashboardPropertyListComponent } from './pages/dashboard-property-list/dashboard-property-list.component';
import { DashboardBottomStatisticModule } from 'src/app/components/dashboard-bottom-statistic/dashboard-bottom-statistic.module';
import { DashboardPropertyListRoutingModule } from './pages/dashboard-property-list/dashboard-property-list-routing.module';
import { PropertyListModule } from './pages/dashboard-property-list/components/property-list/property-list.module';

@NgModule({
  declarations: [DashboardComponent, DashboardPropertyListComponent],
  imports: [
    CommonModule,
    DasbhoardRoutingModule,
    ButtonModule,
    BottomLinksModule,
    MatGridListModule,
    KpiModule,
    PropertyListModule,
    DashboardPropertyListRoutingModule,
    DashboardBottomStatisticModule,
  ],
})
export class DashboardModule {}
