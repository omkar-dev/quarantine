import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notifications = [
    {
      title: 'First notification',
      timestamp: 'time'
    },
    {
      title: 'Second notification',
      timestamp: 'time'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
