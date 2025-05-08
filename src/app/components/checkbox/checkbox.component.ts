import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() checked = false;
  @Input() indeterminate = false;
  @Input() size: 'normal' | 'small' = 'normal';
  @Output() change = new EventEmitter<MatCheckboxChange>();
  @Input() formControl?: FormControl;

  constructor() {}

  ngOnInit(): void {}

  get isCheck(): boolean {
    return this.checked || this.formControl?.value;
  }

  onChange(value: MatCheckboxChange): void {
    this.change.emit(value);

    if (this.formControl) {
      this.formControl.setValue(value.checked);
    }
  }
}
