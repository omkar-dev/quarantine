import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { NavController, LoadingController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('v1', { static: false }) myInput1;
  @ViewChild('v2', { static: false }) myInput2;
  @ViewChild('v3', { static: false }) myInput3;
  @ViewChild('v4', { static: false }) myInput4;
  @ViewChild('v5', { static: false }) myInput5;
  @ViewChild('v6', { static: false }) myInput6;

  languages: string[];
  login:boolean=false;
  LoginForm:FormGroup;
  languageSelected:boolean;
  
  email=""
  vc1="";
  vc2="";
  vc3="";
  vc4="";
  vc5="";
  vc6="";
  
  location;
  lang: string;
  emailid:string;
  logoAnimation: boolean = true; 
  verificationCode:string;

    
    constructor(    private googlePlus: GooglePlus,
      private nativeStorage: NativeStorage,
      public loadingController: LoadingController,
      private platform: Platform,
      public alertController: AlertController,
      private storage:Storage,
      private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private router:Router,public translate: TranslateService, private navCtrl: NavController
    ) {     this.lang = 'en';
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit() {
    this.languages=[
      'English',
      'Hindi',
      'Bengal',
      'Gujrati',
      'Kannada',
      'Marathi',
      'Tamil',
      'Telgu'  ]
         
// LoginForm=new FormGroup({
//   email:new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
//   ])
// })

  }
  switchLanguage() {
    this.translate.use(this.lang);
  }
  getGeoLoc() {
// debugger;
    this.geolocation.getCurrentPosition().then((resp) => {
      // let loc = {}
      this.location['latitude'] = resp.coords.latitude;
      this.location['longitude'] = resp.coords.longitude;
      //this.distanceInKmNew(loc);
      console.log(this.location)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  ionViewWillEnter(){
    //debugger;
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      success => console.log('Location Permission granted',success),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
    );
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.BLUETOOTH_ADMIN).then(
      success => console.log('Bluetooth Permission granted',success),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.BLUETOOTH_ADMIN)
    );
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,this.androidPermissions.PERMISSION.BLUETOOTH_ADMIN]);
    this.getGeoLoc()

    this.storage.get("language").then(res=>{
      console.log("response in ionViewWillEnter",res)
      if(res){
        this.languageSelected = res;
      }
    })

  }
  goToLogin(index){
    this.languageSelected=true;
    // this.storag

this.storage.set("language",this.languageSelected).then((res)=>{
  console.log("Response",res);
 
  
})
  }
  Login(){
 
    // this.verificationCode=this.LoginForm.controls
    this.verificationCode=this.vc1+this.vc2+this.vc3+this.vc4+this.vc5+this.vc6;
   
    let verificationRequestBody={
      email:this.email,
      verificationCode:this.verificationCode,
      coordinates:this.location
    }
    console.log("Verifivation",this.verificationCode);
    console.log("Email",this.emailid)

    this.router.navigate(['/tabs'])

  }
  goToSignUp(){
    console.log('signup')
    this.router.navigate(['/signup'])
  }
  Input(e, number) {
    console.log(e, 'event')
    let reg = /^\d+$/;
    if (reg.test(e.target.value) || e.keyCode == 8 || e.keyCode == 46) {
      if (number == 1) {
        e.keyCode == 8 || e.keyCode == 46 ? this.myInput1.setFocus() : this.myInput2.setFocus()
      } else if (number == 2) {
        e.keyCode == 8 || e.keyCode == 46 ? this.myInput1.setFocus() : this.myInput3.setFocus()
      } else if (number == 3) {
        e.keyCode == 8 || e.keyCode == 46 ? this.myInput2.setFocus() : this.myInput4.setFocus()
      } else if (number == 4) {
        e.keyCode == 8 || e.keyCode == 46 ? this.myInput3.setFocus() : this.myInput5.setFocus()
      }else if (number == 5) {
        e.keyCode == 8 || e.keyCode == 46 ? this.myInput4.setFocus() : this.myInput6.setFocus()
      }else if (number == 6) {
        e.keyCode == 8 || e.keyCode == 46 ? this.myInput5.setFocus() : this.verificationCode = String(this.vc1) + String(this.vc2) + String(this.vc3) + String(this.vc4)+ String(this.vc5)+ String(this.vc6);console.log(this.verificationCode);
      } else {
        this.myInput2.nativeElement.focus()

      }
    }
    

    else {
      if (number == 1) { this.vc1 = '' }
      if (number == 2) { this.vc2 = '' }
      if (number == 3) { this.vc3 = '' }
      if (number == 4) { this.vc4 = '' }
      if (number == 5) { this.vc5 = '' }
      if (number == 6) { this.vc6 = '' }

    }
  }

  async GoogleLogin(){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    this.googlePlus.login({
      'scopes': '', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '1079162340930-gfdqdmgdiktb3brqnqro4822s55m03aj.apps.googleusercontent.com', // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      })
      .then(user => {
        console.log(user,'user data')
        //save user data on the native storage
        this.nativeStorage.setItem('google_user', {
          name: user.displayName,
          email: user.email,
          picture: user.imageUrl
        })
        .then(() => {
          console.log('logged in');
          // this.login=true;
           this.router.navigate(["/tabs"]);
        }, (error) => {
          console.log(error);
        })
        loading.dismiss();
      }, err => {
        console.log(err);
      })
  }

  async presentLoading(loading) {
    return await loading.present();
  }
}
