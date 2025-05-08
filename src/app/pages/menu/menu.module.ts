import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { ButtonBoxModule } from 'src/app/components/button-box/button-box.module';
import { BottomLinksModule } from 'src/app/components/bottom-links/bottom-links.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ButtonBoxModule,
    BottomLinksModule,
  ],
})
export class MenuModule {}
