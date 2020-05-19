import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications: any = [];
  

  constructor(private http : HttpService,private router : Router,private dataService : DataService) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    let uID = 666
    let sID = 1
    this.http.getMessages(uID,sID).subscribe(res=>{
      this.notifications = res['data']
      console.log("notif",this.notifications)
    })
  }

  goToChat(data)
  {
    console.log("data",data)
    if(data.type=='message')
  {
    let body = {
      data : data,
      from : "notification"
    }
    this.dataService.setData(2,body)
    this.router.navigateByUrl('chat/2')
  }
  else {
    console.log("This is a notification")
  }
  }

}
