import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  receivedMessagesArray: any;
  dummyMessageObject : any
  sortedActivities: any;
  shopersMessagesArray: void;
  usersMessagesArray: any;
  sortedUsersMessagesArray: any;
  sortedShopersMessagesArray :  any
  message : any
  shopName: String;
  shopInitials: string;
  uID: any;
  shopID: any;
  constructor(private geolocation : Geolocation, private nativeGeocoder : NativeGeocoder,private route :  ActivatedRoute,private http:HttpService,private storage : Storage) { }

  ngOnInit() {
    
  }

  ionViewWillEnter()
  {



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
            console.log("gotMessages",res)
            this.receivedMessagesArray = res;
            console.log("messages",this.receivedMessagesArray)
          })


         })
        console.log("inside nativegeo",result)

      })
    })





    if (this.route.snapshot.data['special']) {
      if(this.route.snapshot.data['special']['from']=='nearbuy') {
        let data = this.route.snapshot.data['special']['data'];
        console.log("datatatat",data)
        this.shopID = data.shop_userId
        this.shopName = data['shop_name'].toUpperCase()
        this.shopInitials = this.shopName.charAt(0).toUpperCase()
        console.log("initials",this.shopInitials)

         
      
        
              console.log("received data from nearbuy",data)
      }
      else if(this.route.snapshot.data['special']['from']=='notification') {
        this.receivedMessagesArray = this.route.snapshot.data['special']['data'];
      console.log("received data from notif",this.receivedMessagesArray)
      }
      
      

      this.shopersMessagesArray = this.receivedMessagesArray.filter(a=>a.Shopid!='') //filtering shopers message
      this.sortedShopersMessagesArray = this.receivedMessagesArray.sort((a,b)=>new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) //sorting shopers message
      console.log("shopers",this.shopersMessagesArray)

      this.usersMessagesArray = this.receivedMessagesArray.filter(a=>a.Userid!='')  //filtering users messages
      this.sortedUsersMessagesArray= this.receivedMessagesArray.sort((a,b)=>new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())  //sorting users message
      console.log("shopers",this.usersMessagesArray)
      // this.receivedMessagesArray = this.data.

     
      // this.sortedActivities = this.receivedMessagesArray.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp);
      console.log("sorted",this.sortedActivities)
      
      const sortedArray = this.receivedMessagesArray.sort((a,b)=>new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      console.log("sorted",sortedArray)
    }

    
  }

  send()
  {  
    
    this.storage.get('user_store').then(userStore=>{
    console.log("Inside send")
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("inside get",resp)
  
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };
    
    this.nativeGeocoder.reverseGeocode( resp.coords.latitude,resp.coords.longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        console.log("inside nativegeo",result)
   



    let body={
      "to":  userStore['shop']?userStore['shop']['data']['shop_userId']:"",
      "from": userStore.userid,
      "message": this.message,
      "attachment":"",
}

if(result[0].postalCode)body['zipcode']=result[0].postalCode
else body['locality']=result[0].locality
if(this.message){
  this.http.sendMessage(body).subscribe(res=>{
    console.log(res)
    //
  })
}
else
{
  console.log("Cannot send empty message!")
}
});
})
  })

    console.log(this.message)
    
  }



}