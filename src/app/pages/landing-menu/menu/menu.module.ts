import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { ButtonModule } from 'src/app/components/button/button.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, MenuRoutingModule, ButtonModule],
})
export class MenuModule {}
