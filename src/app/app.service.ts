import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getUrl(url: string) {
    return `http://api.aviationstack.com/v1/${url}&access_key=${environment.aviationstack}`;
  }

  httpRequest(req: string, url: string, data?: any) {
    if (req == "get") {
      return this.http.get(this.getUrl(url));
    } else if (req == "post") {
      return this.http.post(this.getUrl(url), data);
    }
    return null
  }

}
