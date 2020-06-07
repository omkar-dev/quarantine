import { Component, OnInit,NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import {  Observable,Subject,pipe } from 'rxjs';
import { debounceTime,switchMap } from 'rxjs/operators';



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
  shopData: any;
  private clickStream = new Subject();
  sending: boolean;
  showRefresh;
  interval;
  constructor(private geolocation : Geolocation,
    private router : Router,
    public zone: NgZone,
    private nativeGeocoder : NativeGeocoder,private route :  ActivatedRoute,private http:HttpService,private storage : Storage) { }

  ngOnInit() {
    this.clickStream.pipe(  switchMap(body => {
      console.log(body)
      return  this.http.sendMessage(body)
      }))
      .subscribe(response => {
        this.GetMessseges()
        console.log(response)
      });

  //  switchMap(e=> this.send()))
  }

  ionViewWillLeave(){
    clearInterval(this.interval)
  }



  TodaysTime(){
    return moment().format('MMM  Do, YYYY')
  }



  GetMessseges(){
    this.storage.get('user_store').then(data=>{
      this.storage.get('messegeID').then(messegeID=>{
        this.uID =data['userid']       
              this.http.getMessages(this.uID,messegeID['zipcode'],messegeID['locality']
                ).subscribe(res=>{
                  let responsemssg = res['messeges']? res['messeges']:[]
                  this.storage.get('messeges').then(messege=>{
                  let savearay =  messege?[...messege,...responsemssg]:responsemssg;
                  this.storage.set('messeges',savearay)
                  this.refreshMessegeInput(savearay)
                  })
  
              })
      })
    })    
  }




  refreshMessegeInput(messege){
    if(this.route.snapshot.data['special']['from']=='nearbuy') {
      messege = messege.filter(val=>(val['from']==this.shopData.shop_userId || val['to']==this.shopData.shop_userId) );
      const sortedArray = messege.sort((a, b) => moment(a).diff(moment(b)))
      this.zone.run(() => {
        this.receivedMessagesArray =sortedArray;
      })

    }
    else if(this.route.snapshot.data['special']['from']=='notification') {


    }



  }
  ionViewWillEnter()
  {
    this.showRefresh=false;


    setTimeout(()=>{
      this.showRefresh=true;
    },9000)
        this.iterativeGet();


      this.GetMessseges()

    if (this.route.snapshot.data['special']) {
      if(this.route.snapshot.data['special']['from']=='nearbuy') {
        let shopData = this.route.snapshot.data['special']['data'];
        this.shopData=this.route.snapshot.data['special']['data'];
        this.shopID = shopData.shop_id
        this.shopName = shopData['shop_name']
        this.shopInitials = this.shopName.charAt(0).toUpperCase()
        console.log(this.shopID)
        console.log(shopData)
        this.storage.get('messeges').then(messege=>{
          messege = messege.filter(val=>(val['from']==this.shopData.shop_userId || val['to']==this.shopData.shop_userId) );
          const sortedArray = messege.sort((a, b) => moment(a).diff(moment(b)))
          this.receivedMessagesArray =sortedArray;

        })

   

    
      }
      else if(this.route.snapshot.data['special']['from']=='notification') {
        this.receivedMessagesArray = this.route.snapshot.data['special']['data'];
      console.log("received data from notif",this.receivedMessagesArray)
      this.shopData={}
      this.shopInitials= this.receivedMessagesArray[0].fromName?this.receivedMessagesArray[0].fromName.charAt(0).toUpperCase():'';
      this.storage.get('user_store').then(userStore=>{
      this.shopName=this.receivedMessagesArray[0].fromName;
      this.shopData['shop_userId']=userStore.userid==this.receivedMessagesArray[0].from?this.receivedMessagesArray[0].to:this.receivedMessagesArray[0].from;
      this.shopID =this.receivedMessagesArray[0].from;
      console.log(    this.shopID)
      })
      }else{
        this.router.navigateByUrl('/notification')
      }


    }else{
      this.router.navigateByUrl('/tabs')
    }

    
  }

  TimeAgo(time){
    return moment(time).format('hh:mm A')
   }



   iterativeGet(){
    console.log('calledI')
    this.interval = setInterval(()=>{
      console.log('called')
      this.GetMessseges()
    },60000)

  }
   

  send()
  {  
       this.storage.get('user_store').then(userStore=>{
        this.storage.get('messegeID').then(messegeID=>{
        let body={
          "to":  this.shopData['shop_userId'],
          "from": userStore.userid,
          'fromName':this.shopData['shop_name'],
          'Read':false,
          "message": this.message,
          "attachment":"",  
          }
    
    if(messegeID['zipcode'])body['zipcode']=messegeID['zipcode']
    else body['locality']=messegeID['locality']
    
    if(this.message){
      this.clickStream.next(body);
    }
    else
    {
      console.log("Cannot send empty message!")
    }
    
      })
    })

    }


    
  



}