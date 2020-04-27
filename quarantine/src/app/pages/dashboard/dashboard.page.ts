import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  role: string;
  messages = [
    {
      Message: 'First message',
      timestamp: 'time'
    },
    {
      Message: 'Second message',
      timestamp: 'time'
    }
  ];

  constructor(private storage: Storage,private router : Router) { }

  ngOnInit() {
    this.storage.set('role', 'medical')
      .then(res => {
        console.log(res);
        this.storage.get('role').then(role => {
          this.role = role;
        });
      });

    
  }


  goToHelpline()
  {
      this.router.navigateByUrl('/helpline')
  }

}
