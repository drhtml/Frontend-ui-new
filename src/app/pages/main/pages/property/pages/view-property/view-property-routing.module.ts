import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPropertyComponent } from './view-property.component';

const routes: Routes = [
  {
    path: '',
    component: ViewPropertyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPropertyRoutingModule {}
