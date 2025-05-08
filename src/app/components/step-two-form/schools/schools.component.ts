import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { ISchoolDetail } from 'src/app/interfaces/ISchoolDetailResponse';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss'],
})
export class SchoolsComponent implements OnInit {
  @Input() formControls = new FormArray<
    FormGroup<{
      name: FormControl<string | null>;
      grade: FormControl<string | null>;
      distance: FormControl<string | null>;
      grades: FormControl<string | null>;
      students: FormControl<string | null>;
    }>
  >([]);

  constructor() {}

  ngOnInit(): void {}

  removeAtIndex(index: number): void {
    this.formControls.removeAt(index);
  }

  getFormControlField(formGroup: FormGroup, key: string): FormControl {
    return formGroup.get(key) as FormControl;
  }

  addNewSchool(): void {
    const schoolForm = new FormGroup({
      name: new FormControl(''),
      grade: new FormControl(''),
      distance: new FormControl(''),
      grades: new FormControl(''),
      students: new FormControl(''),
    });

    this.formControls.push(schoolForm);
  }
}
