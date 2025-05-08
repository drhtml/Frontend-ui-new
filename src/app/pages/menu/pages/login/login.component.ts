import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const adminAccount = {
  email: 'admin',
  password: 'admin',
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    public authenticateService: AuthenticateService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  getControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  submitForm() {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.markAsDirty();
      this.form.get(key)?.markAsTouched();
    });


    const formValue = this.form.value;
    if (this.form.invalid) {
      return;
    }

    this.authenticateService
      .login({
        email: formValue.email || '',
        password: formValue.password || '',
      })
      .subscribe((result) => {
        if (result.success === false) {
          this._snackBar.open(result.message, 'CLOSE', {
            verticalPosition: 'top',
            panelClass: 'error',
            duration: 3000,
          });
        } else if (result.role === 'ADMIN') {
          this.router.navigate(['/main/site-management/main'], {
            queryParams: { tab: 0 },
          });
        } else {
          this.router.navigate(['/main/dashboard']);
        }
      });
  }
}
