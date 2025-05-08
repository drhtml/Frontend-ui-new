import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAsToggleComponent } from './view-as-toggle.component';



@NgModule({
  declarations: [
    ViewAsToggleComponent
  ],
  exports: [
    ViewAsToggleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ViewAsToggleModule { }
