import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IOptionField } from 'src/app/interfaces/IOptionField';
import { IScreenSize } from 'src/app/interfaces/IScreenSize';

@Component({
  selector: 'app-radios',
  templateUrl: './radios.component.html',
  styleUrls: ['./radios.component.scss'],
})
export class RadiosComponent implements OnInit {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() options: IOptionField[] = [];
  @Input() formControl: FormControl = new FormControl();
  @Input() numberOfColumn = 0;
  @Input() disabled = false;

  constructor() {}

  ngOnInit(): void {
    if (!this.numberOfColumn) {
      this.numberOfColumn = this.options.length;
    }
  }

  public ngOnChanges(changes: any): void {
    if (
      changes.hasOwnProperty('options') &&
      this.options &&
      !this.numberOfColumn
    ) {
      this.numberOfColumn = this.options.length;
    }
  }

  changeValue(newValue: string) {
    this.formControl.patchValue(newValue);
  }
}
