import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { LandingMenuRoutingModule } from './main.routing.module';
import { LeftMenusComponent } from './components/left-menus/left-menus.component';
import { MobileMenusComponent } from './components/mobile-menus/mobile-menus.component';
import { ButtonModule } from 'src/app/components/button/button.module';
import { BottomLinksModule } from 'src/app/components/bottom-links/bottom-links.module';
import { DividerModule } from 'src/app/components/divider/divider.module';

@NgModule({
  declarations: [MainComponent, LeftMenusComponent, MobileMenusComponent],
  imports: [
    CommonModule,
    LandingMenuRoutingModule,
    ButtonModule,
    BottomLinksModule,
    DividerModule,
  ],
})
export class MainModule {}
