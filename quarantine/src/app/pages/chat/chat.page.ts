import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { HttpService } from 'src/app/services/http.service';


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
  constructor(private route :  ActivatedRoute,private http:HttpService) { }

  ngOnInit() {
    
  }

  ionViewWillEnter()
  {
    if (this.route.snapshot.data['special']) {
      if(this.route.snapshot.data['special']['from']=='nearbuy') {
        let data = this.route.snapshot.data['special']['data'];
        let shopID = data.Shopid
        let userID = data.Userid
      console.log("received data from nearbuy",this.receivedMessagesArray)
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
    console.log(this.message)
    console.log("Inside send")
    let body={
      "type":"message",
      "messege_id":"4667",
      "Shopid":"999",
      "Userid":"12",
      "Message": this.message,
      "Attachment":"new img",
      "timestamp":"45678"
}
if(this.message){
  this.http.sendMessage(body).subscribe(res=>{
    console.log(res)
  })
}
else
{
  console.log("Cannot send empty message!")
}
    
  }



}