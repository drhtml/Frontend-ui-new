import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-price-evolution',
  templateUrl: './price-evolution.component.html',
  styleUrls: ['./price-evolution.component.scss']
})
export class PriceEvolutionComponent implements OnInit {
  @Input() formControls = new FormArray<
    FormGroup<{
      year: FormControl<string | null>;
      yearValue: FormControl<string | null>;
    }>
  >([]);

  constructor() { }

  ngOnInit(): void {
  }

  removeAtIndex(index: number): void {
    this.formControls.removeAt(index);
  }

  getFormControlField(formGroup: FormGroup, key: string): FormControl {
    return formGroup.get(key) as FormControl;
  }

  addNew(): void {
    const newForm = new FormGroup({
      year: new FormControl(''),
      yearValue: new FormControl(''),
    });

    this.formControls.push(newForm);
  }

}
