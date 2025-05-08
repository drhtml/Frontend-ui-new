import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingMenuComponent } from './landing-menu.component';

const routes: Routes = [
  {
    path: '',
    component: LandingMenuComponent,
    children: [
      {
        path: 'menu',
        loadChildren: () =>
          import('./menu/menu.module').then((m) => m.MenuModule),
      },
      {
        path: 'about-us',
        loadChildren: () =>
          import('./about-us/about-us.module').then((m) => m.AboutUsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingMenuRoutingModule {}
