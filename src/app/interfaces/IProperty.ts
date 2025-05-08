export type IEvaluationStatus =
  | 'Not Started'
  | 'In Progress'
  | 'Completed'
  | 'Yes'
  | 'No'
  | '';

export interface IProperty {
  id: string;
  name: string;
  dateAdded: string;
  location: string;
  type: string;
  evaluationStatus: IEvaluationStatus;
  value: string;
  soldPrice: string;
  spread: string;
  leads?: number;
  bestPricePoint?: number;
}
