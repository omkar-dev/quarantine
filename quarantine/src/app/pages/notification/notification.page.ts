import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notifications = [
    {
      message: 'You have a new notification',
      date: '25-03-2020',
      sender : "Farhan Patel",
      time : "9:00 PM"
    },
    {
      message: 'You have a new notification',
      date: '05-01-2020',
      sender : "Vikas Sharma",
      time : "10:00 AM"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
