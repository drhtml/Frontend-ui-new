import { FormControl, FormGroup } from '@angular/forms';

export type IFormPriceEvolutionItem = FormGroup<{
  year: FormControl<string | null>;
  yearValue: FormControl<string | null>;
}>;
