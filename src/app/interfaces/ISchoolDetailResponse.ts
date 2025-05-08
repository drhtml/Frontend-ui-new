import { IStatus } from './IPropertyDetail';

export interface ISchoolDetail {
  OBInstID?: string;
  InstitutionName: string;
  GSTestRating?: string;
  gradelevel1lotext: string;
  gradelevel1hitext: string;
  gradelevel1?: string;
  Filetypetext?: string;
  geocodinglatitude?: string;
  geocodinglongitude?: string;
  distance: string;
  students?: string;
  isGoodGrade?: boolean;
}

export interface ISchoolDistrict {
  Obdistrictnumber: string;
  districttype: string;
  districtname: string;
  districtlatitude: string;
  districtlongitude: string;
}

export interface ISchoolDetailResponse {
  status: IStatus;
  property?: {
    school: ISchoolDetail[];
    schoolDistrict: ISchoolDistrict;
  }[];
}
