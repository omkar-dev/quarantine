import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.page.html',
  styleUrls: ['./nearby.page.scss'],
})
export class NearbyPage implements OnInit {
  tabPart = "medical";
  public location;
  public lat;
  public long;
  public currentCity;
  public currentUserCity;
  public medicalstorelist = [];
  public grocerystorelist = [];
  public searchTerm:string = ""; 
  public shopDetails ;
  locationData: any;
  public backupjsondata:any;
  constructor(private navCtrl: NavController,private storage: Storage,private geolocation: Geolocation,private nativeGeocoder: NativeGeocoder,public httpClient: HttpClient) { }

  ionViewWillEnter()
  {
   this.currentCity = "kalyan"
   this.storage.set("currentCity",this.currentCity);
   this.storage.get('currentCity').then(toc=>{
   this.currentUserCity = toc;
   console.log("currentUserCity", this.currentUserCity)
   })
   this.getGeoLoc();
   
  }
  ngOnInit() {
    this.getShopDetails();
  
  }

  getGeoLoc() {
    // debugger;
        this.geolocation.getCurrentPosition().then((resp) => {
          // let loc = {}
          // this.location['latitude'] = resp.coords.latitude;
          // this.location['longitude'] = resp.coords.longitude;
          // console.log(this.location)

          this.lat = resp.coords.latitude;
          this.long = resp.coords.longitude;
          console.log("watchhhh",this.lat,this.long);

          this.getReverseGeoCode(this.lat,this.long);        
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

    this.locationData = {
      lat : result[0].latitude,
      long :result[0].longitude,
      country : result[0].countryName,
      // city : result[0].locality,
      city : "kalyan",
      postCode : result[0].postalCode
    }
    
    this.storage.set('locationData',this.locationData)

  })
  .catch((error: any) => console.log(error));
}

getShopDetails(){

  this.httpClient.get("https://us-central1-quarantine-275312.cloudfunctions.net/Shopkeeper?shop_locality="+"kalyan", {
  }).subscribe(data => {

    console.log("SHOPDETAILS",data)

    this.shopDetails = data;

    this.backupjsondata = this.shopDetails['data']

    console.log("backupjsondata",this.backupjsondata)

    console.log("shopDetails", this.shopDetails)

    this.medicalstorelist = this.shopDetails['data'].filter(stat =>  stat.shop_type.includes('medical') )

    console.log("medicalstorelist", this.medicalstorelist)

    this.grocerystorelist = this.shopDetails['data'].filter(stat => stat.shop_type.includes('grocery'))

    console.log("grocerystorelist",this.grocerystorelist)
  
    },error=>{
    });

}




  onchat(){

this.navCtrl.navigateForward(["/chat"])

  }


  filterJSONData()
  {   
    console.log(this.searchTerm,this.backupjsondata)

    if(this.searchTerm && this.searchTerm.trim()!='')
    {
      this.medicalstorelist = this.backupjsondata.filter(item =>   {

        return ( String(item['shop_name']).toLowerCase().startsWith(this.searchTerm.toLowerCase()) )
       })
      console.log("New shopDetails",this.medicalstorelist)
    }
   
    
  }
}
