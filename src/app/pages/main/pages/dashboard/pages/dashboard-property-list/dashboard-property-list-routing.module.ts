import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPropertyListComponent } from './dashboard-property-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPropertyListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPropertyListRoutingModule {}
