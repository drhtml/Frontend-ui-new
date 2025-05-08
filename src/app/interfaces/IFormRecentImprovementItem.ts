import { FormControl, FormGroup } from '@angular/forms';

export type IFormRecentImprovementItem = FormGroup<{
  type: FormControl<string | null>;
  description: FormControl<string | null>;
  date: FormControl<string | null>;
}>;
