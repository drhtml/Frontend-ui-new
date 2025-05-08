import { Component, Input, OnInit } from '@angular/core';
import { IResponseProperty } from 'src/app/interfaces/backendResponse/IResponseProperty';
import { ISchoolDetail } from 'src/app/interfaces/ISchoolDetailResponse';

@Component({
  selector: 'app-review-schools',
  templateUrl: './review-schools.component.html',
  styleUrls: ['./review-schools.component.scss'],
})
export class ReviewSchoolsComponent implements OnInit {
  @Input() propertyData?: IResponseProperty;
  datas: ISchoolDetail[] = [];

  constructor() {}

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      this.datas = (this.propertyData.schools || []).map((item) => {
        return {
          InstitutionName: item.name,
          gradelevel1lotext: '',
          gradelevel1hitext: '',
          gradelevel1: item.grades,
          GSTestRating: `${item.overallGrade}`,
          distance: item.distances,
          students: item.students,
          isGoodGrade: item.overallGrade >= 7,
        };
      });
    }
  }
}
