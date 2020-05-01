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
  isShopkeeper : boolean
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
  helpRequestArray = [];
  helpFor: any;

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

  ionViewWillEnter()
  {
    this.isShopkeeper =false
  
    this.helpRequestArray =[{
      name : "I need Help",
      imgUrl : "handiCaf.svg",
      show:false,
      navigationUrl : "/need-help"
    },
  {
    name : "I can Help",
    imgUrl : "medical_1.svg",
    show:false,
    navigationUrl : "/can-help"
  },
  {
    name : "Helpline numbers",
    imgUrl : "ppl.svg",
    show:false ,   
     navigationUrl : "/helpline"


  },
  {
    name : "Donations",
    imgUrl : "donate.svg",
    show:false,
    navigationUrl : "/helpline"
  }
]
  }


  goToHelpline()
  {
      this.router.navigateByUrl('/helpline')
  }

  selectReq(data,index)
  {
    this.helpRequestArray.map(help=>help.show=false);
    data.show=true;
    // this.handicap=this.medHelp=this.layoff=this.foodReq=false
    console.log(data,index)
    this.helpFor = data.name
    console.log("helpFor",this.helpFor)
    this.router.navigateByUrl(data.navigationUrl)
  }

}
