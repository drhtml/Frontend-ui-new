import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IOptionField } from 'src/app/interfaces/IOptionField';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    realEstateAgentLicense: new FormControl(''),
  });

  public customerTypeOptions: IOptionField[] = [
    {
      key: 'CANARY',
      label: 'I’m a Canary',
    },
    {
      key: 'REAL_ESTATE_AGENT',
      label: 'Real Estate Agent',
    },
  ];

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
      .signup({
        firstName: formValue.firstName || '',
        lastName: formValue.lastName || '',
        email: formValue.email || '',
        password: formValue.password || '',
        type: formValue.type || '',
        ...(formValue.type === 'REAL_ESTATE_AGENT'
          ? {
              realEstateAgentLicense: formValue.realEstateAgentLicense || '',
            }
          : {}),
      })
      .subscribe((result) => {
        if (result.success === false) {
          this._snackBar.open(result.message, 'CLOSE', {
            verticalPosition: 'top',
            panelClass: 'error',
            duration: 3000,
          });
        } else {
          this.router.navigate(['/menu/login']);
        }
      });
  }
}
