import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notifications = [
    {
      message: 'You have a new message',
      date: '25-03-2020',
      sender : "Farhan Patel",
      time : "9:00 PM",
      type: "message"
    },
    {
      message: 'You have a new notification',
      date: '05-01-2020',
      sender : "Vikas Sharma",
      time : "10:00 AM",
      type : "notification"
    }
  ];

  constructor(private router : Router,private dataService : DataService) { }

  ngOnInit() {
  }

  goToChat(data)
  {
    if(data.type=='message')
  {
    this.dataService.setData(2,data)
    this.router.navigateByUrl('chat/2')
  }
  else {
    console.log("This is a notification")
  }
  }

}
