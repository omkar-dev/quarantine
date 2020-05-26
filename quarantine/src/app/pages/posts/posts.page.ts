import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  postsArray: any
  jsonURL: string;

  constructor(private http : HttpClient,
    private _location: Location,
    private storage: Storage,
    public alertController : AlertController
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {

    this.storage.get('user_store').then(userStore=>{
      this.jsonURL = 'https://us-central1-quarantine-276114.cloudfunctions.net/helpapi?user_id='+userStore['userid'];
      this.http.get(this.jsonURL).subscribe(res=>{
        console.log("response",res)
        this.postsArray = res['data']
      })
    })



  
  }

  


  resolve(data)
  { 

    this.storage.get('user_store').then(userStore=>{

    let body = {
        "edit":true,
        "resolve" : true,
        "delete"  : "",
        "help_id" : data['help_id'],
        "user_id" : userStore['userid']
        }

        let options= {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
    
    console.log("data",data)  
    if(!data.resolve)
    {
        this.http.post("https://us-central1-quarantine-276114.cloudfunctions.net/helpapi",body,options).subscribe(res=>{
          console.log("after put",res)
        })
    }  
    else
    {
      console.log("This matter is already resolved")
    }

  })
  }




async callDelete(data){
  const alert = await this.alertController.create({
    message:  "Do you really want to Delete this Post",
    buttons: [
      {
        text: 'No',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Yes',
        handler: () => {
         this.delete(data)
        }
      }
    ]
  });

  await alert.present();
}


  delete(data)
  {
    console.log("data",data)

    this.storage.get('user_store').then(userStore=>{

    let body = {
      "edit":true,
      "resolve" : "",
      "delete"  : true,
      "help_id" : data['help_id'],
      "user_id" : userStore['userid']
      }

      let  options =  {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
      this.http.post('https://us-central1-quarantine-276114.cloudfunctions.net/helpapi',body,options).subscribe(res=>{
        console.log("after put",res)
      })
    })
  }



}