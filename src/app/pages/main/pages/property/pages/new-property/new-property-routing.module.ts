import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPropertyComponent } from './new-property.component';

const routes: Routes = [
  {
    path: '',
    component: NewPropertyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPropertyRoutingModule {}
