export interface IResponseDashboardAdmin {
  success: boolean;
  data: {
    totalLeads: number;
    numberOfEvaluations: number;
    activeProperties: number;
    activeUsers: number;
    totalEvaluationsAmount: number;
  };
}
