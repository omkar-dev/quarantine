import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions , NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import * as moment from 'moment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications: any = [];
  uID: any;



  /*

        messege_id:,
        to: // from: //   message:   attachment:  timestamp:

        const sortedArray = _.orderBy(array, (o: any) => {
      return moment(o.date.format('YYYYMMDD');
    }, ['asc']);




  */
  

  constructor(private geolocation : Geolocation,private nativeGeocoder : NativeGeocoder,private http : HttpService,private router : Router,private dataService : DataService,private storage : Storage) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {


    this.processMesseges();


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


    })
  
  
  this.storage.get('user_store').then(data=>{
    this.storage.get('messegeID').then(messegeID=>{
      this.uID =data['userid']       
            this.http.getMessages(this.uID,messegeID['zipcode'],messegeID['locality']
              ).subscribe(res=>{
                let responsemssg = res['messeges']? res['messeges']:[]
                this.storage.get('messeges').then(messege=>{
                let savearay =  messege?[...messege,...responsemssg]:responsemssg;
                this.storage.set('messeges',savearay)
                })

            })
    })
  })    
      

  

    

 
      
  
    
  }

  processMesseges(){
    this.storage.get('user_store').then(userStore=>{
    this.storage.get('messeges').then(messege=>{
      let sortedArray = messege.sort((a, b) => moment(a).diff(moment(b)))
      sortedArray= sortedArray.filter(val=>val['from']== userStore['userid'] &&  val['to']!= userStore['userid'] )
     
     console.log(sortedArray)
     let DistArray=[]
     let Itaray=[]
  
      sortedArray.map(data=>{
        //console.log(Itaray)
        if(Itaray.includes(data['from']+data['to'])||Itaray.includes(data['to']+data['from'])){
          let i =Itaray.indexOf(Itaray.includes(data['from']+data['to'])?data['from']+data['to']:data['to']+data['from']);
          console.log(i,'outer')
          DistArray[i].push(data);

        }else{
          if(data){
            Itaray.push(data['from']+data['to'])
            let i = []
            i.push(data)
            DistArray.push(i);
          }

        }
      })
console.log( this.notifications,DistArray)

      this.notifications = DistArray

    })

  })
  }
      



  TimeAgo(time){
   return moment(time).fromNow()
  }

  goToChat(data)
  {
    console.log("data",data)
    console.log( data.some(val=>val['messege_id']))
    if(data.some(val=>val['messege_id'])){
      let body = {
        'from':'notification',
        'data':data
      }
      this.dataService.setData(2,body)
      this.router.navigateByUrl('chat/2')
    }

  }

}
