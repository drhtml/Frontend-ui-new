import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingMenuComponent } from './landing-menu.component';
import { LandingMenuRoutingModule } from './landing-menu-routing.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { ButtonBoxModule } from 'src/app/components/button-box/button-box.module';

@NgModule({
  declarations: [LandingMenuComponent],
  imports: [
    CommonModule,
    LandingMenuRoutingModule,
    ButtonModule,
    ButtonBoxModule,
  ],
})
export class LandingMenuModule {}
