import { Component, OnInit, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController, ToastController } from '@ionic/angular';
import { TrackerComponentPage } from '../tracker-component/tracker-component.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-visit-history',
  templateUrl: './visit-history.page.html',
  styleUrls: ['./visit-history.page.scss'],
})
export class VisitHistoryPage implements OnInit {
  data: any;
  public watch: any;  
  subscription : any;
  public lat: number = 0;
  public lng: number = 0;
 // backgroundLocObject: BackgroundGeolocationResponse;
  locationData: any;
  locationsArray = []
  startTrack: boolean = true;
  buttonText: string = "Track me";
  latitude: any;
  longitude: any;
  combinedLatLong: string;
  mapUrl: string;
  showTrack =true
  interval: any;

  constructor(public toastController : ToastController,public storage : Storage,public modalController : ModalController,public sanitizer: DomSanitizer,private nativeGeocoder: NativeGeocoder,public geolocation : Geolocation,public zone : NgZone,private http: HttpClient, 
    //private backgroundGeolocation: BackgroundGeolocation
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.storage.get("locationsArray").then(res=>{
      if(res)
      {
        this.locationsArray=res
      }
    })
    
    this.mapUrl = "https://www.google.com/maps/embed/v1/place?q="+this.combinedLatLong+"&key=AIzaSyCEibeFAFYEpG6xh4eq8R_F_BQxba2XcQc&zoom=17"
    console.log("combined",this.combinedLatLong)
  }



startTracking()
  {
    let startMessage = "Tracking has been started! with interval of one minute"
    this.presentToast(startMessage)
    // Foreground Tracking
    this.showTrack = false
    this.watch = this.geolocation.watchPosition();
  this.subscription = this.watch.subscribe((data) => {
   this.zone.run(() => {
        this.lat =  data.coords.latitude
        this.lng =  data.coords.longitude
        console.log("watchhhh",this.lat,this.lng);
        this.getReverseGeoCode(this.lat,this.lng)
        
      });
  });
this.interval = setInterval(()=>{
  this.watch = this.geolocation.watchPosition();
  this.subscription = this.watch.subscribe((data) => {
   this.zone.run(() => {
        this.lat =  data.coords.latitude
        this.lng =  data.coords.longitude
        console.log("watchhhh",this.lat,this.lng);
        this.getReverseGeoCode(this.lat,this.lng)
        
      });
  });
},60000)
}


// async openTrackerModal()
//   {
   
//     console.log("inside modal")
//     const modal = await this.modalController.create({
//       component: TrackerComponentPage,
//       // componentProps : { "data" :  objToSend}
//     });
//     await modal.present()
//   }
getReverseGeoCode(lat,long)
{
  let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
};

this.nativeGeocoder.reverseGeocode(lat, long, options)
  .then((result: NativeGeocoderResult[]) => {
    this.locationData = {
      lat : result[0].latitude,
      long :result[0].longitude,
      country : result[0].countryName,
      city : result[0].locality,
      postCode : result[0].postalCode,
      subLocality : result[0].subLocality,
    }
    this.locationsArray.push(this.locationData);
    console.log("LocationsArray",this.locationsArray);
    this.storage.set("locationsArray",this.locationsArray)
  })
  .catch((error: any) => console.log(error));
}

  stopTracking()
  {
    let stopMessage = "Tracking has been stopped!"
    this.presentToast(stopMessage)
    clearInterval(this.interval)
    this.showTrack=true
    console.log("inside stop")
  //  this.backgroundGeolocation.stop();
    this.subscription.unsubscribe();
  }

 checkButton()
 {
   this.startTrack = !this.startTrack
   this.startTrack ? (this.buttonText = "Track Me") && this.stopTracking() : (this.buttonText = "Stop Tracking") && this.startTracking();
  console.log("startTrack",this.startTrack,this.buttonText)
 }

 showMarker(lat,long)
 {
  this.combinedLatLong = lat+","+long
  this.mapUrl = "https://www.google.com/maps/embed/v1/place?q="+this.combinedLatLong+"&key=AIzaSyCEibeFAFYEpG6xh4eq8R_F_BQxba2XcQc&zoom=17"
  console.log("combined",this.combinedLatLong)
 }

 async presentToast(message) {
  let toast = await this.toastController.create({
    message: message,
    duration: 2000,
    position: 'bottom'
  });

  return await (await toast).present();
}

}
