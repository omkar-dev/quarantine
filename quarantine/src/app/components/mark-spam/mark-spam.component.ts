import { Component, OnInit } from '@angular/core';
import { PopoverController ,NavParams} from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-mark-spam',
  templateUrl: './mark-spam.component.html',
  styleUrls: ['./mark-spam.component.scss'],
})
export class MarkSpamComponent implements OnInit {
  spam=[];
  data: any;
  constructor(private http :  HttpClient,private popoverController: PopoverController,
    public navParams: NavParams,private storage : Storage
    ) { }

  ngOnInit() {
 this.data=this.navParams.get('data')

  }

  onMarkSpam() {


    this.storage.get('user_store').then(userStore=>{

      let body = {
        "edit":true,
        "resolve" : "",
        "spam":userStore['userid'],
        "delete"  : "",
        "help_id" : this.data['help_id'],
        "user_id" : userStore['userid']
        }
  
        let  options =  {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
        this.http.post('https://us-central1-quarantine-276114.cloudfunctions.net/helpapi',body,options).subscribe(res=>{
          console.log("after put",res)
        })
      })


    this.spam=[]
    this.popoverController.dismiss();
  }

}
