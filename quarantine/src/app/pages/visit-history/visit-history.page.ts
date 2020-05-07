import { Component, OnInit, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  BackgroundGeolocationEvents
} from "@ionic-native/background-geolocation/ngx";
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

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
  backgroundLocObject: BackgroundGeolocationResponse;
  locationData: any;
  locationsArray = []
  startTrack: boolean = true;
  buttonText: string = "Track me";
  latitude: number;
  longitude: any;
  combinedLatLong: string;
  mapUrl: string;

  constructor(public sanitizer: DomSanitizer,private nativeGeocoder: NativeGeocoder,private localNotifications : LocalNotifications,public geolocation : Geolocation,public zone : NgZone,private http: HttpClient, private backgroundGeolocation: BackgroundGeolocation) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.latitude = 40.7127837;
    this.longitude = -74.0059413              // this initial values of lat long will be taken from storage
    this.combinedLatLong = "40.7127837,-74.0059413"
    this.mapUrl = "https://www.google.com/maps/embed/v1/place?q="+this.combinedLatLong+"&key=AIzaSyCEibeFAFYEpG6xh4eq8R_F_BQxba2XcQc&zoom=17"
    console.log("combined",this.combinedLatLong)
  }

  startTracking()
  {
    console.log("inside start")
         // Background Tracking

         const config: BackgroundGeolocationConfig = {
              desiredAccuracy: 10,
              stationaryRadius: 20,
              distanceFilter: 30,
              debug: false, //  enable this hear sounds for background-geolocation life-cycle.
              stopOnTerminate: false, // enable this to clear background location settings when the app terminates
              notificationsEnabled: false,
              startForeground  : false

            };
        
            this.backgroundGeolocation.configure(config).then(() => {
              this.backgroundGeolocation
                .on(BackgroundGeolocationEvents.location)
                .subscribe((location: BackgroundGeolocationResponse) => {
                  console.log("Location",location);
                  this.backgroundLocObject = location
            
                });
            });

    
    this.backgroundGeolocation.start();
    this.localNotifications.schedule({
          id: 1,
          text: 'Location is being tracked. Click to Stop',
        });

        this.localNotifications.on('click').subscribe(notification => {
              // Insert your logic here
              console.log("Notificationnnn",notification)
              this.stopTracking();
               });



    // Foreground Tracking


  this.watch = this.geolocation.watchPosition();
this.subscription = this.watch.subscribe((data) => {
 this.zone.run(() => {
      this.lat =  data.coords.latitude
      this.lng =  data.coords.longitude
      console.log("watchhhh",this.lat,this.lng);
      this.getReverseGeoCode(this.lat,this.lng)
      
    });
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
  })
  .catch((error: any) => console.log(error));
}

  stopTracking()
  {
    console.log("inside stop")
    this.backgroundGeolocation.stop();
    this.subscription.unsubscribe();
  }

 checkButton()
 {
   this.startTrack = !this.startTrack
   this.startTrack ? (this.buttonText = "Track Me") && this.stopTracking() : (this.buttonText = "Stop Tracking") && this.startTracking()
  console.log("startTrack",this.startTrack,this.buttonText)
 }

 showMarker(lat,long)
 {
  this.combinedLatLong = lat+","+long
  this.mapUrl = "https://www.google.com/maps/embed/v1/place?q="+this.combinedLatLong+"&key=AIzaSyCEibeFAFYEpG6xh4eq8R_F_BQxba2XcQc&zoom=17"
  console.log("combined",this.combinedLatLong)
 }

}
