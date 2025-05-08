import { IEvaluationStatus } from './IProperty';

export interface IPricePoint {
  id: number;
  lead: string;
  visits: number;
  engagement: string;
  location: string;
  sessionDuration: string;
  repeatVisit: IEvaluationStatus;
  requestInfo: IEvaluationStatus;
}
