import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { Router } from '@angular/router';


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
  languageSelected:boolean=false
  verificationCode;
  email=""
  vc1="";
  vc2="";
  vc3="";
  vc4="";
  vc5="";
  vc6="";
  location;

    
    constructor(private storage:Storage,
      private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private router:Router
    ) { }

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
    debugger;
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
  }
  goToLogin(index){
    this.languageSelected=true;
    // this.storage

  }
  Login(){
    // this.verificationCode=this.LoginForm.controls
    this.verificationCode=this.vc1+this.vc2+this.vc3+this.vc4+this.vc5+this.vc6
    let verificationRequestBody={
      email:this.email,
      verificationCode:this.verificationCode,
      coordinates:this.location
    }
    console.log(this.verificationCode)
    
  }
  goToSignUp(){
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
}
