import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  sendMessage(body) 
  {
    let options =
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    return this.http.post('https://us-central1-quarantine-13853.cloudfunctions.net/messages',body,options)
  }
}
