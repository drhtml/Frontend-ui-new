import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { InputFieldModule } from 'src/app/components/input-field/input-field.module';
import { CheckboxModule } from 'src/app/components/checkbox/checkbox.module';
import { ButtonModule } from 'src/app/components/button/button.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    InputFieldModule,
    CheckboxModule,
    ButtonModule,
  ],
})
export class LoginModule {}
