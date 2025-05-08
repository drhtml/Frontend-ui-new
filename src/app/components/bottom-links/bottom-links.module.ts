import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomLinksComponent } from './bottom-links.component';



@NgModule({
  declarations: [
    BottomLinksComponent
  ],
  exports: [
    BottomLinksComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BottomLinksModule { }
