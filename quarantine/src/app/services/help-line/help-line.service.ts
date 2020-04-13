import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HelpLineService {

  constructor(private httpclient:HttpClient) { }

  getHelpline():Observable<any>{
    
    return this.httpclient.get("");

  }
}
