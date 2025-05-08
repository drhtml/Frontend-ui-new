export interface IStatus {
  version: string;
  code: number;
  msg: string;
  total: number;
  page: number;
  pagesize: number;
  transactionID: string;
}

export interface IIdentifier {
  Id: number;
  fips: string;
  apn: string;
  attomId: number;
}

export interface ILot {
  lotnum: string;
  lotsize1: number;
  lotsize2: number;
  pooltype: string;
}

export interface IArea {
  blockNum: string;
  loctype: string;
  countrysecsubd: string;
  countyuse1: string;
  muncode: string;
  munname: string;
  subdname: string;
}

export interface IAddress {
  country: string;
  countrySubd: string;
  line1: string;
  line2: string;
  locality: string;
  matchCode: string;
  oneLine: string;
  postal1: string;
  postal2: string;
  postal3: string;
}

export interface IGeoIdV4 {
  ZI: string;
  N2: string;
  CS: string;
}

export interface ILocation {
  accuracy: string;
  latitude: string;
  longitude: string;
  distance: number;
  geoid: string;
  geoIdV4: IGeoIdV4;
}

export interface ISummary {
  absenteeInd: string;
  propclass: string;
  propsubtype: string;
  proptype: string;
  yearbuilt: number;
  propLandUse: string;
  propIndicator: string;
  legal1: string;
}

export interface IUtilities {
  coolingtype: string;
  heatingtype: string;
  heatingfuel: string;
}

export interface ISize {
  bldgsize: number;
  grosssize: number;
  grosssizeadjusted: number;
  groundfloorsize: number;
  livingsize: number;
  sizeInd: string;
  universalsize: number;
}

export interface IRooms {
  bathfixtures: number;
  bathsfull?: number;
  bathspartial?: number;
  bathstotal: number;
  beds?: number;
}

export interface IInterior {
  fplcind: string;
  fplctype: string;
  bsmtsize: number;
}

export interface IConstruction {
  condition: string;
  constructiontype: string;
  foundationtype: string;
  frameType: string;
  roofcover: string;
  wallType: string;
}

export interface IParking {
  prkgSize: number;
  prkgSpaces: string;
  prkgType?: string;
}

export interface ISummary2 {
  archStyle: string;
  bldgType: string;
  imprType: string;
  levels: number;
  quality: string;
  storyDesc: string;
  view: string;
  yearbuilteffective: number;
}

export interface IBuilding {
  size: ISize;
  rooms: IRooms;
  interior: IInterior;
  construction: IConstruction;
  parking: IParking;
  summary: ISummary2;
}

export interface IVintage {
  lastModified: string;
  pubDate: string;
}

export interface IPropertyInfo {
  identifier: IIdentifier;
  lot: ILot;
  area: IArea;
  address: IAddress;
  location: ILocation;
  summary: ISummary;
  utilities: IUtilities;
  building: IBuilding;
  vintage: IVintage;
}

export interface IPropertyDetail {
  status: IStatus;
  property?: IPropertyInfo[];
}
