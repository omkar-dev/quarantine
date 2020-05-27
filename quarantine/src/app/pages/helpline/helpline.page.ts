import { Component, OnInit } from '@angular/core';
import { HelpLineService } from '../../services/help-line/help-line.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from 'src/app/services/http.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import {Location} from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


@Component({
  selector: 'app-helpline',
  templateUrl: './helpline.page.html',
  styleUrls: ['./helpline.page.scss'],
})
export class HelplinePage implements OnInit {
  lang: string;
  data: any;
  donationsArray: any;
  epidemicsArray: any;
  helpLineArray: any;
  contactNumber: any;
  states: any;
  backupHelpline: any;
  filteredDonationsArray = [];
  state: any;
  lat: number;
  long: number;
  locationData: any
  constructor(private helplineservice:HelpLineService
    ,public translate: TranslateService,
    private _location: Location,
    public http : HttpService,
    private callNumber: CallNumber,
    private geolocation : Geolocation,private nativeGeocoder : NativeGeocoder ) { 

      this.lang = 'en';
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }


  Helpline:string;
  Helpline_id:number;
  Helpline_name:string;
  Helpline_no:number;
  Helpline_line:number;


  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.http.getDonations().subscribe(res=>{
      console.log("resss",res)
      this.data = res['data']
      console.log("len",this.data.length)
      let i
      this.donationsArray=[]
      this.epidemicsArray=[]
      this.helpLineArray = []
      for(i=0;i<this.data.length;i++)
      {
        this.donationsArray.push(this.data[i]['Donations'])
        this.epidemicsArray.push(this.data[i]['Epidemics'])
        this.helpLineArray.push(this.data[i]['Helplines'])
      }
      console.log("Donate Array", this.donationsArray) 
      console.log("Epi Array", this.epidemicsArray) 
      console.log("Helpline", this.helpLineArray) 
      this.donationsArray.map(m=>{
        if(m.donation_name!='')
        {
          this.filteredDonationsArray.push(m)
        }
      })
      console.log("filteredDon",this.filteredDonationsArray)
      this.states =this.getAllCat(this.helpLineArray);
      this.backupHelpline = this.helpLineArray
      console.log("statesArray",this.states)
 
        console.log("state",this.state)
 


    })
  }

  openBrowser(data)
  {
    console.log(data);
    let link = data['donation_link']
    window.open(link, '_system', 'location=yes')
  }
  switchLanguage() {
    this.translate.use(this.lang);
  }

  GetHelpLine(){
    this.helplineservice.getHelpline().subscribe((data)=>
    {
      var anyData=<any>data;
      this.GetHelpLine=anyData.data;
    }
    )
  }

  openDialer(contact)
  {
    console.log("contact",contact)
    this.contactNumber = contact
    console.log(typeof(this.contactNumber))
  this.callNumber.callNumber(this.contactNumber, true)
.then(res => console.log('Launched dialer!', res))
.catch(err => console.log('Error launching dialer', err));
  }

  getAllCat(arr) {
    let res = [];
    if(arr){
      arr.map(m => {
          if (m != "") {
            res.push(m.helpline_name);
          }
    
      });
    }
    return this.unique(res);
  }

  unique(inp) {
    let uniqueValues = new Set(inp); //Using Set to get all unique values.
    let array = Array.from(uniqueValues);
    return array; //Array of unique values.
  }

  stateChange(event)
  {
    this.helpLineArray = this.backupHelpline
    console.log("event",event.value)
    this.helpLineArray = this.helpLineArray.filter(data=>{
      return data.helpline_name==event.value
    })
  }

  // getCurrentCity()
  // {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     // let loc = {}
  //     if(resp &&  resp.coords){
  //       this.lat = resp.coords.latitude;
  //       this.long = resp.coords.longitude;
  //       //this.distanceInKmNew(loc);
  //       console.log(this.lat)
        

  //     }

  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }

//   getReverseGeoCode(lat,long)
// {
//   let options: NativeGeocoderOptions = {
//     useLocale: true,
//     maxResults: 5
// };

// this.nativeGeocoder.reverseGeocode(lat, long, options)
//   .then((result: NativeGeocoderResult[]) => {
//     this.locationData = {
//       lat : result[0].latitude,
//       long :result[0].longitude,
//       country : result[0].countryName,
//       city : result[0].locality,
//       postCode : result[0].postalCode,
//       subLocality : result[0].subLocality,
//     }
   
//   })
//   .catch((error: any) => console.log(error));
// }

}









