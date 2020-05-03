import { Component, OnInit } from '@angular/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-need-help',
  templateUrl: './need-help.page.html',
  styleUrls: ['./need-help.page.scss'],
})
export class NeedHelpPage implements OnInit {

  helpRequestArray=[]
  helpFor: any;
  location: any;
  lat: number;
  long: any;
  locationData: { lat: string; long: string; country: string; city: string; postCode: string; };
  contactNo : Number;
  helpText : String;

  constructor(private router : Router,private geolocation : Geolocation, private nativeGeocoder: NativeGeocoder, public loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.helpRequestArray =[{
      name : "Handicap",
      imgUrl : "handiCaf.svg",
    show:false

    },
  {
    name : "Medical Help",
    imgUrl : "medical_1.svg",
    show:false

  },
  {
    name : "Job Layoffs",
    imgUrl : "job.svg",
    show:false

  },
  {
    name : "Food Requests",
    imgUrl : "food_request.svg",
    show:false
  }
]
  }

  selectReq(data,index)
  {
    this.helpRequestArray.map(help=>help.show=false);
    data.show=true;
    // this.handicap=this.medHelp=this.layoff=this.foodReq=false
    console.log(data,index)
    this.helpFor = data.name
    console.log("helpFor",this.helpFor)
  }


  async detectLocation()
  {
    console.log("inside detectlocation")
    this.presentLoading()
    this.geolocation.getCurrentPosition().then((resp) => {
      // let loc = {}
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
      this.getReverseGeoCode(this.lat,this.long)


    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getReverseGeoCode(lat,long)
  {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };
  
  this.nativeGeocoder.reverseGeocode(lat, long, options)
    .then((result: NativeGeocoderResult[]) => {
      if(result)
      {
        this.loadingCtrl.dismiss()
      }
      console.log("reverseResult",result)
      this.location = result[0].locality
      // this.locationData = {
      //   lat : result[0].latitude,
      //   long :result[0].longitude,
      //   country : result[0].countryName,
      //   city : result[0].locality,
      //   postCode : result[0].postalCode
      // }
    })
    .catch((error: any) => console.log(error));
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Detecting Location',
      duration: 2000
    });
    await loading.present();
  }

  gotoPost()
  {
    this.router.navigateByUrl('/posts')
  }

}

