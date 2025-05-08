import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IOptionField } from 'src/app/interfaces/IOptionField';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
})
export class CheckboxGroupComponent implements OnInit {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() options: IOptionField[] = [];
  @Input() size: 'normal' | 'small' = 'small';
  @Input() formControl: FormControl = new FormControl({});

  constructor() {}

  ngOnInit(): void {}

  isCheck(key: string): boolean {
    return this.formControl.value ? this.formControl.value[key] : false;
  }

  change(key: string, value: MatCheckboxChange): void {
    this.formControl.setValue({
      ...(this.formControl.value || {}),
      [key]: value.checked,
    });
  }
}
