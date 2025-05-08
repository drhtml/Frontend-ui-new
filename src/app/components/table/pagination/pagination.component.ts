import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IOptionField } from 'src/app/interfaces/IOptionField';
import { IPaginationConfig } from 'src/app/interfaces/ITableConfig';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  collection = ['string'];
  displayOptions: IOptionField[] = [
    {
      label: '10',
      key: 10 as any,
    },
    {
      label: '50',
      key: 50 as any,
    },
    {
      label: '100',
      key: 100 as any,
    },
  ];
  displayFormControl: FormControl = new FormControl(10);
  @Input() paginationData: IPaginationConfig = {
    itemsPerPage: 0,
    currentPage: 0,
    totalItems: 0,
    isInfiniteScroll: false,
  };
  @Input() loading: boolean = false;
  @Output() paginationChange = new EventEmitter<IPaginationConfig>();

  constructor() {}

  ngOnInit(): void {
    this.displayFormControl.valueChanges.subscribe((itemsPerPage) => {
      this.paginationChange.emit({
        ...this.paginationData,
        itemsPerPage,
      });
    });
  }

  onPageChange(currentPage: number) {
    this.paginationChange.emit({
      ...this.paginationData,
      currentPage,
    });
  }

  selectInfiniteScroll() {
    this.paginationChange.emit({
      ...this.paginationData,
      currentPage: 1,
      isInfiniteScroll: true,
    });
  }

  selectViewByPage() {
    this.paginationChange.emit({
      ...this.paginationData,
      currentPage: 1,
      isInfiniteScroll: false,
    });
  }
}
