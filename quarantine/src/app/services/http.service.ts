import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  donationData: any;

  constructor(private http: HttpClient) { }

  getDonations()
  {
    return this.http.get('https://us-central1-quarantine-275006.cloudfunctions.net/function-1')
  }
}
