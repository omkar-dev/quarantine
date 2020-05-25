import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { PopoverController } from '@ionic/angular';
import { MarkSpamComponent } from 'src/app/components/mark-spam/mark-spam.component';
import {Location} from '@angular/common';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-can-help',
  templateUrl: './can-help.page.html',
  styleUrls: ['./can-help.page.scss'],
})
export class CanHelpPage implements OnInit {

  isResolved = 'active';
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

  helpRequests = []

  //   {
  //     helpType: "Food Requests",
  //     avatar: "../../../assets/kitchen.svg",
  //     help_info: "Lorem ipsum dolor sit amet",
  //     phone_no: '911',
  //     resolved: 'active'
  //   },
  //   {
  //     helpType: "Job Layoffs",
  //     avatar: "../../../assets/job_layout.svg",
  //     help_info: "Lorem ipsum dolor sit amet",
  //     phone_no: '911',
  //     resolved: 'resolved'
  //   },
  //   {
  //     helpType: "Medical Help",
  //     avatar: "../../../assets/medical_2.svg",
  //     help_info: "Lorem ipsum dolor sit amet",
  //     phone_no: '911',
  //     resolved: 'resolved'
  //   },
  //   {
  //     helpType: "Handicap",
  //     avatar: "../../../assets/handicaf_1.svg",
  //     help_info: "Lorem ipsum dolor sit amet",
  //     phone_no: '911',
  //     resolved: 'active'
  //   },
  // ];
  filteredReqs = this.helpRequests;

  constructor(private callNumber: CallNumber, 
    private storage: Storage,
    private http : HttpClient,
    private _location: Location,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.filteredReqs = this.filterRequests(this.isResolved);
  }

  selectHelpType(data)
  {
    if (!data.selected){
      this.helpTypes.map(help => help.selected = false);
      data.selected = true;
      this.filteredReqs = this.filterRequests(this.isResolved, data.name);
    }
    else {
      this.filteredReqs = this.filterRequests(this.isResolved);
      data.selected = false;
    }
  }

  ionViewWillEnter()
  {



    this.geolocation.getCurrentPosition().then((resp) => {
  
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };
    
    this.nativeGeocoder.reverseGeocode( resp.coords.latitude,resp.coords.longitude, options)
      .then((result: NativeGeocoderResult[]) => {
     
  
        let URL = 'https://us-central1-quarantine-276114.cloudfunctions.net/helpapi?locality='+result[0].locality;
        this.http.get(URL).subscribe(res=>{
          console.log("response",res)
          this.helpRequests = res['data'];
          this.filteredReqs = this.helpRequests;
        })
      })
      .catch((error: any) => console.log(error));     

    })
  
 
    

  
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

  segmentChanged(event) {
    this.helpTypes.map(help => help.selected = false);
    this.filteredReqs = this.filterRequests(this.isResolved);
  }

  filterRequests(isResolved, helpType?) {
    if (helpType) {
      return this.helpRequests.filter(req => ((req.resolved === isResolved) && (req.helpType === helpType)));
    } 
    else {
      return this.helpRequests.filter(req => req.resolved === isResolved);
    }
  }

}
