import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IOptionField } from 'src/app/interfaces/IOptionField';
import { getErrorMessage } from 'src/app/utils/form';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  host: {
    '[class]': "'size-' + size",
  },
})
export class SelectFieldComponent implements OnInit {
  @Input() noLabel = false;
  @Input() label = '';
  @Input() leftLabel = '';
  @Input() placeholder = 'Select value';
  @Input() options: IOptionField[] = [];
  @Input() formControl: FormControl = new FormControl();
  @Input() size: 'normal' | 'small' = 'normal';

  constructor() {}

  ngOnInit(): void {}

  get errorMessage(): string {
    return getErrorMessage(this.formControl, '');
  }
}
