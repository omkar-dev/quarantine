import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  role: string;

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.set('role', 'common')
      .then(res => console.log('role set'));

    this.storage.get('role').then(role => {
      this.role = role;
    });
  }

}
