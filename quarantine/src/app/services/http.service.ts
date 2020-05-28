import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  options =
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
  donationData: any;

  constructor(private http: HttpClient) { }

  getDonations()
  {
    return this.http.get('https://us-central1-quarantine-275006.cloudfunctions.net/function-1')
  }

  sendMessage(body) 
  {
    return this.http.post('https://us-central1-quarantine-13853.cloudfunctions.net/messages',body,this.options)
  }

  getMessages(uID,zipcode,locality)
  {
    let extra = zipcode?"&zipcode="+zipcode:"&locality="+locality
    return this.http.get('https://us-central1-quarantine-13853.cloudfunctions.net/messages?Userid='+uID+extra)
  }

    helpPostRequest(body)
    {
        return this.http.post('https://us-central1-quarantine-276114.cloudfunctions.net/helpapi',body,this.options)
    }
}
