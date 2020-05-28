import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions , NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications: any = [];
  uID: any;
  

  constructor(private geolocation : Geolocation,private nativeGeocoder : NativeGeocoder,private http : HttpService,private router : Router,private dataService : DataService,private storage : Storage) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.storage.get('user_store').then(userStore=>{
      console.log("userStore",userStore)
      if(userStore.shop=="")
      {
        console.log("User is member")
        this.uID = userStore.userid
      }
      else
      {
        console.log("User is a shopkeeper")
        this.uID = userStore['shop']['data']['shop_userId']
      }

      this.geolocation.getCurrentPosition().then((resp) => {
        console.log("inside get",resp)
    
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
      };
      
      this.nativeGeocoder.reverseGeocode( resp.coords.latitude,resp.coords.longitude, options)
        .then((result: NativeGeocoderResult[]) => {
  
  
  
         
      
          this.storage.get('user_store').then(data=>{
            this.uID =data['userid']
            this.http.getMessages(this.uID,result[0].postalCode,result[0].locality
              ).subscribe(res=>{
                this.notifications = res['messeges']


            })
  
  
           })
          console.log("inside nativegeo",result)
  
        })
      })


     
      
    })
    
  }

  goToChat(data)
  {
    console.log("data",data)
    if(data.type=='message')
  {
    let body = {
      data : data,
      from : "notification"
    }
    this.dataService.setData(2,body)
    this.router.navigateByUrl('chat/2')
  }
  else {
    console.log("This is a notification")
  }
  }

}
