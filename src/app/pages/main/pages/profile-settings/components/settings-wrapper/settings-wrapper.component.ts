import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { isFileImage } from 'src/app/utils/file';

@Component({
  selector: 'app-settings-wrapper',
  templateUrl: './settings-wrapper.component.html',
  styleUrls: ['./settings-wrapper.component.scss'],
})
export class SettingsWrapperComponent implements OnInit {
  @Input() form = new FormGroup<any>({});
  @Input() title = '';
  @Output() saveChange = new EventEmitter<void>();

  @ViewChild('file')
  myInputVariable?: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  get avatarUrl(): string {
    return this.form.get('avatar')?.value?.url || '';
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
      const form = this.form;
      reader.onload = function (e) {
        form.get('avatar')?.patchValue({
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
