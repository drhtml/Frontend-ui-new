import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { InputFieldModule } from 'src/app/components/input-field/input-field.module';
import { RadiosModule } from 'src/app/components/radios/radios.module';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    InputFieldModule,
    ButtonModule,
    RadiosModule,
  ],
})
export class SignupModule {}
