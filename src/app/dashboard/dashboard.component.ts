import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  data: any;
  loading = 'Loading...';

  // MatPaginator Output
  pageEvent: PageEvent;
  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {

    this.generalService.getKeywords({ pageSize: 0, pageIndex: 10 }).subscribe(res => {
      this.data = res;
      this.loading = null;
    });
  }

  handlePage(input): any {
    this.loading = 'Loading...';
    this.generalService.getKeywords({ input }).subscribe(res => {
      this.data = res;
      this.loading = null;
    });
    return input;
  }
}
