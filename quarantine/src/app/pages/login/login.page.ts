import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { catchError } from 'rxjs/operators';
import { Device } from '@ionic-native/device/ngx';
import { NavController, LoadingController, Platform, AlertController, IonSlides, ModalController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OtpPage } from '../otp/otp.page';

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
  @ViewChild("mySlider", { static: false }) onboardingSlides: IonSlides;

  languages: string[];
  login:boolean=false;
  LoginForm:FormGroup;
  languageSelected:boolean;
  
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
  showVC: boolean = false;
  showOnboard: boolean = true;
  previouChecksUrl: string;
  StorageLoaded: boolean;

    
 constructor(private modalController: ModalController,private googlePlus: GooglePlus,
      private nativeStorage: NativeStorage,
      public loadingController: LoadingController,
      private platform: Platform,
      public alertController: AlertController,
      private storage:Storage,
      private device: Device,
      private androidPermissions: AndroidPermissions,
      private geolocation: Geolocation,
     private router:Router,public translate: TranslateService, private navCtrl: NavController,
     private route:ActivatedRoute, private http: HttpClient
  ) {     
    this.lang = 'en';
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    router.events.subscribe(event => {
      // if (event instanceof NavigationEnd) {
      //   console.log("eventt",event)
      //   this.previouChecksUrl = event.url;
      //   if (this.previouChecksUrl) {
      //     this.languageSelected = true;
      //   }
      // }
    });
  }



  ClearData(){
    this.showVC=false;
    this.verificationCode='';
    this.emailid='';
    this.vc6=this.vc5=this.vc4=this.vc3=this.vc2=this.vc1=""
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

  }

  StorageLoadtrue(): any {
    this.StorageLoaded = true;
  }

  switchLanguage(lang) {
    this.languageSelected=true;
    this.StorageLoaded = false;
    // this.storag
    this.storage.set("language",this.languageSelected).then((res)=>{
      console.log("Response",res);
    });
    this.languageSelected = true;
    this.showOnboard = false;
    this.translate.use(this.lang);
  }

  
  getGeoLoc() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // let loc = {}
      this.location={}
      if(resp &&  resp.coords){
        this.location['latitude'] = resp.coords.latitude;
        this.location['longitude'] = resp.coords.longitude;
        //this.distanceInKmNew(loc);
        console.log(this.location)

      }

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  ionViewWillEnter(){
    console.log("lang",this.languageSelected)
    console.log("onBoard",this.showOnboard)

    this.ClearData();
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

    // language
    this.StorageLoaded = false;
    setTimeout(this.StorageLoadtrue(), 300);
    this.storage.get('language').then(s => {
      if (!s) {
        this.languageSelected = false;
      }
      else {
        this.languageSelected = true;
        this.StorageLoaded = false;
      }
      console.log("lang",this.languageSelected)
    });
    this.storage.get('OnboardingShown').then(s => {
      if (s) {
        this.showOnboard = true;
      } else {
        this.showOnboard = false;
        this.StorageLoaded = false;
      }
      console.log("onBoard",this.showOnboard)

    })

  }

  async onLogin() {
    const loading = await this.loadingController.create({
      message: 'Verifying details'
    });
    this.presentLoading(loading);
    let accountVerified = this.accountVerified(this.emailid);
    if (accountVerified) {
      this.router.navigate(['/tabs']);
    }
    else {
      let params = new HttpParams();
      params = params.append('user_name', ' ');
      params = params.append('email', this.emailid);
      params = params.append('attempt', '2');

      this.http.get(
        'https://us-central1-quarantine-4a6e8.cloudfunctions.net/verify_code_send',
        {params: params, responseType: 'text'}
      )
      .pipe(
        catchError(e => {
          loading.dismiss()
          this.showAlert('User Not found');
          throw new Error(e.error);
        })
      )
      .subscribe(response => {
        
        if (response === 'Otp Send') {
          this.showVC = true;
          this.openOTPModal();
          loading.dismiss()
          
        }
      });
    }
  }
  async openOTPModal()
  {
    let objToSend={
      email : this.emailid,
      from : "login"
    }
    console.log("inside modal")
    const modal = await this.modalController.create({
      component: OtpPage,
      componentProps : { "data" :  objToSend}
    });
    await modal.present()
  }

  verifyCode() {
    let params = new HttpParams();
    params = params.append('user_code',this.verificationCode );
    params = params.append('email', this.emailid);
    params = params.append('attempt', '2');
    params = params.append('user_name', ' ');

    this.http.get('https://us-central1-quarantine-4a6e8.cloudfunctions.net/verify_code', { params: params } )
      .pipe(
        catchError(e => {
          this.showAlert('Wrong OTP! Try Again!');
          this.vc1 = this.vc2 = this.vc3 = this.vc4 = this.vc5 = this.vc6 = "";
          throw new Error(e.error);
        })
        )
        .subscribe(response => {
          this.router.navigate(['/tabs']);
          this.showVC = false;
          this.storeVerifiedAccount();
      })
  }

  storeVerifiedAccount() {
    this.storage.get('VerifiedAccounts').then(verifiedAccounts => {
      if(verifiedAccounts){
        let verifiedAccount = {
          'deviceId': this.device.uuid,
          'emailId': this.emailid
        }
        verifiedAccounts[verifiedAccounts.length] = verifiedAccount;
        this.storage.set('VerifiedAccounts', verifiedAccounts);
      }
      else{
        let verifiedAccount = {
          'deviceId': this.device.uuid,
          'emailId': this.emailid
        }
        verifiedAccounts = [];
        verifiedAccounts[0] = verifiedAccount
        this.storage.set('VerifiedAccounts', verifiedAccounts);
      }
    });
  }

  accountVerified(emailid): boolean {
    let accountVerified: boolean = false;
    this.storage.get('VerifiedAccounts').then(verifiedAccounts => {
      if (verifiedAccounts) {
        accountVerified = verifiedAccounts.some(account => account.email === emailid);
      }
      else {
        accountVerified = false;
      }
    })
    return accountVerified;
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

  async showAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.present();
  }

  async SlideOnTimeOut() {
    setTimeout(() => {
      this.onboardingSlides.slideNext();
    }, await this.getTime())
  }

  async getTime() {
    let i:any;
    let time = [15000, 21500, 21000, 20500];
    await this.onboardingSlides.getActiveIndex().then((data) => {
      i = data;
    })
    return time[i];
  }

  goToLogin() {
    this.showOnboard = true;
    this.storage.set('OnboardingShown', true); //SETTING KEY TO TRUE, ONCE THE INITIAL ROOT PAGE IS SHOWN.
    this.languageSelected=true
    this.storage.set('language', true);
  }

  ionViewDidLeave() {
    this.StorageLoaded = false;
  }

 

}
