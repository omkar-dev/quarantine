import { Component, OnInit,ViewChild } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { PopoverController } from '@ionic/angular';
import { MarkSpamComponent } from 'src/app/components/mark-spam/mark-spam.component';
import {Location} from '@angular/common';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-can-help',
  templateUrl: './can-help.page.html',
  styleUrls: ['./can-help.page.scss'],
})
export class CanHelpPage implements OnInit {

  @ViewChild(MarkSpamComponent) child;

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
  backupReq: any[];
  activeReq: any[];
  resolvedReq: any[];
  message: any;

  constructor(private callNumber: CallNumber, 
    private storage: Storage,
    private http : HttpClient,
    private socialSharing: SocialSharing,
    private _location: Location,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.filteredReqs = this.filterRequests(this.isResolved);
  }

  ngAfterViewInit() {
    // this.message = this.child.message
  }
  selectHelpType(data)
  {
    console.log("isRes",this.isResolved)

          this.isResolved=='active' ? this.filteredReqs = this.activeReq : this.filteredReqs=this.resolvedReq

    console.log("data",data)
    // if (!data.selected){
    //   this.helpTypes.map(help => help.selected = false);
    //   data.selected = true;
    //   this.filteredReqs = this.filterRequests(this.isResolved, data.name);
    // }
    // else {
    //   this.filteredReqs = this.filterRequests(this.isResolved);
    //   data.selected = false;
    // }
    this.helpTypes.map(help=>help.selected=false);
    data.selected=true;

    
    let helpType = data.name
    console.log("helpType",helpType)

    this.filteredReqs =     this.filteredReqs?this.filteredReqs.filter(res=>{
      return res.help_for == helpType
    }):[];
  }



  share(){
    let quarantieUrl='www.google.com'
    this.socialSharing.share('Quarantine APP',quarantieUrl)
  
}

  getImagePath(help){
    help=help['help_for'] 
    console.log(help)
if(help=='Job Layoffs') return 'job_layout.svg'
else if(help=='Food Requests') return 'kitchen.svg'
else if(help=='Handicap') return 'handicaf_1.svg'
else if(help=='Medical Help') return 'medical_2.svg'
else return 'callIcon.svg'

}


  ionViewWillEnter()
  {


    this.helpTypes.map(help=>help.selected=false);

    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("inside get",resp)
  
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };
    
    this.nativeGeocoder.reverseGeocode( resp.coords.latitude,resp.coords.longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        console.log("inside nativegeo",result)

     
  
        let URL = 'https://us-central1-quarantine-276114.cloudfunctions.net/helpapi?locality='+result[0]['locality'];
        this.http.get(URL).subscribe(res=>{
          console.log("response",res)
          this.helpRequests = res['data'];
         // this.helpRequests = this.helpRequests.filter(res=>{ !res.delete })
          this.filteredReqs = this.helpRequests;
          this.activeReq = this.filteredReqs.filter(res=>{
            return res.resolve==false
          })
          this.resolvedReq = this.filteredReqs.filter(res=>{
            return res.resolve==true
          })
          this.backupReq=this.filteredReqs
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

  async openMenu(data) {
    const popover = this.popoverController.create({
      component: MarkSpamComponent,
      componentProps:{data:data},
      event: event
    });
    return (await popover).present();
  }

  segmentChanged(event) {
    console.log("isRes",this.isResolved)
    
    // console.log("segChange",event)
    // this.helpTypes.map(help => help.selected = false);
    // this.filteredReqs = this.filterRequests(this.isResolved);
    if(event.target.value=='resolved')
    {
      this.filteredReqs = this.resolvedReq
      console.log("resolvedFilter",this.filteredReqs)
    }
    else
    {
      this.filteredReqs = this.activeReq
    }
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
