import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'property',
        loadChildren: () =>
          import('./pages/property/property.module').then(
            (m) => m.PropertyModule
          ),
      },
      {
        path: 'profile-settings',
        loadChildren: () =>
          import('./pages/profile-settings/profile-settings.module').then(
            (m) => m.ProfileSettingsModule
          ),
      },
      {
        path: 'site-management',
        loadChildren: () =>
          import('./pages/site-management/site-management.module').then(
            (m) => m.SiteManagementModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingMenuRoutingModule {}
