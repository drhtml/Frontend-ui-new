import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from './menu-item.component';



@NgModule({
  declarations: [
    MenuItemComponent
  ],
  exports: [
    MenuItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MenuItemModule { }
