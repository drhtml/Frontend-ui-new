import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteManagementComponent } from './site-management.component';

const routes: Routes = [
  {
    path: '',
    component: SiteManagementComponent,
    children: [
      {
        path: 'main',
        loadChildren: () =>
          import('./pages/main/main.module').then((m) => m.MainModule),
      },
      {
        path: 'user-profile/:id',
        loadChildren: () =>
          import('./pages/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: '**',
        redirectTo: 'main',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteManagementRoutingModule {}
