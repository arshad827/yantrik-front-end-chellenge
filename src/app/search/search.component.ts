
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { GeneralService } from '..//general.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // defaults
  searchValue: any;
  selectValue: any = 'language';
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  data: any;
  oldValue: any;
  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }

  // on-select event to be triggered
  onSelect(value): void {
    console.log('slect', this.selectValue,
      (this.searchValue ? this.searchValue : null),
      (this.pageEvent ? this.pageEvent : { pageIndex: 0, pageSize: 10 }));

    this.generalService.getGitRepoDetails(
      this.selectValue,
      (this.searchValue ? this.searchValue : null),
      (this.pageEvent ? this.pageEvent : { pageIndex: 0, pageSize: 10 })
    ).subscribe(
      resp => {
        this.data = resp.items;
      }
    );

  }
  // on-change event to be triggered
  getRepoDetails(value): void {

    this.generalService.getGitRepoDetails(
      this.selectValue ? this.selectValue : null,
      this.searchValue,
      (this.pageEvent ? this.pageEvent : { pageIndex: 0, pageSize: 10 }))
      .subscribe(
        resp => {
          // ** Only call this api when get the data, inorder to shorten the insert api call  */
          this.data = resp.items;
          console.log(this.data);
          if (this.oldValue != value) {
            this.oldValue = value;
            this.generalService.insertKeyword({ type: this.selectValue, key: this.searchValue }).subscribe(res => {
              console.log(res);
            });
          }
        }
      );

  }


  // pagination to be triggered
  handlePage(input): any {
    console.log('paginator', this.selectValue, this.searchValue, input);

    this.generalService.getGitRepoDetails(
      (this.selectValue ? this.selectValue : null),
      (this.searchValue ? this.searchValue : null),
      input).subscribe(
        resp => {
          this.data = resp.items;
          console.log(resp);
        }
      );
    return input;
  }
}
