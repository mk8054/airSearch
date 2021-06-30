import { AppService } from './app.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  isSearch: boolean = true;
  limit: number = 20;
  offset: number = 0;
  loading: boolean = false;
  loadMore: boolean = false;
  search: string | null = null;
  airportList: any[] = [];
  pagination: any = {};
  errorMsg: string | null = null;
  constructor(private appService: AppService) { }

  intiSearch() {
    this.errorMsg = null;
    this.airportList = [];
    this.loadMore = false;
    this.offset = 0;
    this.fetchAirports()
  }


  fetchAirports() {
    this.loading = true;
    this.appService.httpRequest('get', `airports?limit=${this.limit}&offset=${this.offset}&search=${this.search}`)?.subscribe(
      (res: any) => {
        this.loading = false;
        this.loadMore = false;
        this.airportList = [...this.airportList, ...res.data];
      }, (err) => {
        this.search = "";
        this.errorMsg = `${err.error.error.message}, Please try to search again`;
        this.loadMore = false;
        this.loading = false;
      })
  }

  loadMoreAirports() {
    this.loadMore = true;
    this.fetchAirports()

  }
}
