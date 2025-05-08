import { FormControl, FormGroup } from '@angular/forms';

export type IFormSchoolItem = FormGroup<{
  name: FormControl<string | null>;
  grade: FormControl<string | null>;
  distance: FormControl<string | null>;
  grades: FormControl<string | null>;
  students: FormControl<string | null>;
}>;
