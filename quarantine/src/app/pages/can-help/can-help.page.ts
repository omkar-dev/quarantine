import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { PopoverController } from '@ionic/angular';
import { MarkSpamComponent } from 'src/app/components/mark-spam/mark-spam.component';


@Component({
  selector: 'app-can-help',
  templateUrl: './can-help.page.html',
  styleUrls: ['./can-help.page.scss'],
})
export class CanHelpPage implements OnInit {

  helpTypes: any[] = [
    {
      name: "Handicap",
      imgUrl: "handiCaf.svg",
      selected: false
    },
    {
      name: "Medical Help",
      imgUrl: "medical_1.svg",
      selected: false
    },
    {
      name: "Job Layoffs",
      imgUrl: "job.svg",
      selected: false
    },
    {
      name: "Food Requests",
      imgUrl: "food_request.svg",
      selected: false
    }
  ];

  helpRequests = [
    {
      helpType: "Food Requests",
      avatar: "../../../assets/kitchen.svg",
      help_info: "Lorem ipsum dolor sit amet",
      phone_no: '911'
    },
    {
      helpType: "Job Layoffs",
      avatar: "../../../assets/job_layout.svg",
      help_info: "Lorem ipsum dolor sit amet",
      phone_no: '911'
    },
    {
      helpType: "Medical Help",
      avatar: "../../../assets/medical_2.svg",
      help_info: "Lorem ipsum dolor sit amet",
      phone_no: '911'
    },
    {
      helpType: "Handicap",
      avatar: "../../../assets/handicaf_1.svg",
      help_info: "Lorem ipsum dolor sit amet",
      phone_no: '911'
    },
  ];
  filteredReqs = this.helpRequests;

  constructor(private callNumber: CallNumber, private popoverController: PopoverController) { }

  ngOnInit() {
  }

  selectHelpType(data)
  {
    if (!data.selected){
      this.helpTypes.map(help => help.selected = false);
      data.selected = true;
      this.filteredReqs = this.helpRequests.filter(req => req.helpType === data.name);
    }
    else {
      this.filteredReqs = this.helpRequests;
      data.selected = false;
    }
  }

  selectReq(req) {
    console.log(req);
  }

  openDialer(phoneNo) {
    this.callNumber.callNumber(phoneNo, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  async openMenu() {
    const popover = this.popoverController.create({
      component: MarkSpamComponent,
      event: event
    });
    return (await popover).present();
  }

}
