import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';


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
  constructor(private route :  ActivatedRoute) { }

  ngOnInit() {
    
  }

  ionViewWillEnter()
  {
    if (this.route.snapshot.data['special']) {
      this.receivedMessagesArray = this.route.snapshot.data['special'];
      console.log("received data",this.receivedMessagesArray)

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



}