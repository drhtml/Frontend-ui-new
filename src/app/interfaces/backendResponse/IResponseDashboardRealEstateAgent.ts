export interface IResponseTopFiveSourceCity {
  _id: string;
  count: number;
}
export interface IResponseAverageVisitsPerPricePoint {
  _id: string;
  count: number;
  propertyId: number;
  timestamps: string[];
}
export interface IResponseDashboardRealEstateAgent {
  success: boolean;
  data: {
    activeProperties: number;
    averageSpread: number;
    totalAmount: number;
    totalLeads: number;
    totalViews: number;
    campaigns: number;
    topFiveSourceCities: IResponseTopFiveSourceCity[];
    averageVisitsPerPricePoint: IResponseAverageVisitsPerPricePoint[];
  };
}
export const emptyIResponseDashboardRealEstateAgent: IResponseDashboardRealEstateAgent =
  {
    success: true,
    data: {
      activeProperties: 0,
      averageSpread: 0,
      totalAmount: 0,
      totalLeads: 0,
      totalViews: 0,
      campaigns: 0,
      topFiveSourceCities: [],
      averageVisitsPerPricePoint: [],
    },
  };
