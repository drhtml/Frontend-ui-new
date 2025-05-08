import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isFileImage } from 'src/app/utils/file';
import { formatLastLogin } from 'src/app/utils/string';

@Component({
  selector: 'app-profile-wrapper',
  templateUrl: './profile-wrapper.component.html',
  styleUrls: ['./profile-wrapper.component.scss'],
})
export class ProfileWrapperComponent implements OnInit {
  @Input() isEdit = false;
  @Input() formControl = new FormControl();
  @Input() profileFormControl: FormGroup = new FormGroup({});

  @ViewChild('file')
  myInputVariable?: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  get avatarUrl(): string {
    return this.formControl.value?.url || '';
  }

  get fulleName(): string {
    return `${this.profileFormControl.value?.lastName} ${this.profileFormControl.value?.firstName}`;
  }

  get email(): string {
    return this.profileFormControl.value?.email;
  }

  get lastLogin(): string {
    return formatLastLogin(this.profileFormControl.value?.lastLogin);
  }

  get typeString(): string {
    return this.profileFormControl.value?.customerType === 'REAL_ESTATE_AGENT' ? 'Real Estate Agent' : 'A Canary';
  }

  handleFileInput(files: any) {
    this.onSelectFiles(files.files);
  }

  onSelectFiles(files: FileList) {
    let file = files.item(0);
    if (file && !isFileImage(file)) {
      file = null;
    }

    if (file) {
      const reader = new FileReader();
      const formControl = this.formControl;
      reader.onload = function (e) {
        formControl.patchValue({
          url: e.target?.result,
          file,
        });
      };
      reader.readAsDataURL(file);
    }
    if (this.myInputVariable) {
      this.myInputVariable.nativeElement.value = '';
    }
  }
}
