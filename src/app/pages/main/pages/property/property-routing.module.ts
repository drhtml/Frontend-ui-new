import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyComponent } from './property.component';

const routes: Routes = [
  {
    path: '',
    component: PropertyComponent,
    children: [
      {
        path: 'new',
        loadChildren: () =>
          import('./pages/new-property/new-property.module').then(
            (m) => m.NewPropertyModule
          ),
      },
      {
        path: 'view/:id',
        loadChildren: () =>
          import('./pages/view-property/view-property.module').then(
            (m) => m.ViewPropertyModule
          ),
      },
      {
        path: 'edit/:id',
        loadChildren: () =>
          import('./pages/edit-property/edit-property.module').then(
            (m) => m.EditPropertyModule
          ),
      },
      {
        path: '**',
        redirectTo: 'new',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyRoutingModule {}
