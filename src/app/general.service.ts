import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  baseUrl = 'https://api.github.com/search/repositories?';
  apiUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  getGitRepoDetails(select, search, pagintation): Observable<any> {

    const params = {
      q: `${select ? select : ''}:${search ? search : ''}`,
      sort: 'stars',
      order: 'desc',
      per_page: pagintation.pageSize,
      page: pagintation.pageIndex
    };

    return this.http.get(this.baseUrl, { params });
  }


  getKeywords(input): Observable<any> {
    return this.http.post(this.apiUrl + '/get-keywords', {
      pageize: input.pageSize,
      pageIndex: input.pageIndex
    });
  }

  insertKeyword(input): Observable<any> {
    return this.http.post(this.apiUrl + '/add-keyword', input);
  }
}
