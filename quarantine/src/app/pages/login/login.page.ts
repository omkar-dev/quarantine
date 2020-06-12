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
 
  languages: any[];
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
      {
      'name':'English',
      'color':'#1261A0',
      'lngCode' : 'en'

    },
    {
      'name': 'Hindi',
      'color':'#01796F',
      'lngCode' : 'hd'
    },
    {
      'name': 'Bengali',
      'color':'#993A16',
      'lngCode' : 'bl'

    }, {
      'name': 'Gujrati',
      'color':'#DAA520',
      'lngCode' : 'guj'

    }, {
      'name':'Kannada',
      'color':'#2E8B57',
      'lngCode' : 'en'

    }, {
      'name': 'Marathi',
      'color':'#FDA50F',
      'lngCode' : 'ml'

    }, {
      'name':'Tamil',
      'color':'#57A0D3',
      'lngCode' : 'tal'
    },
    {
      'name':   'Telugu',
      'color':'#708238',
      'lngCode' : 'tl'
    }
     ]

  }

  async returnIndex(){
 if(this.onboardingSlides){
  let i =  await this.onboardingSlides.getActiveIndex();
  console.log(i,'idi')
  return i
 }else{
   return 0
 }

  }

  StorageLoadtrue(): any {
    this.StorageLoaded = true;
  }

  switchLanguage(lang) {
    console.log("langgg",lang)
    this.languageSelected=true;
    this.StorageLoaded = false;
    // this.storag
    this.storage.set("language",this.languageSelected).then((res)=>{
      console.log("Response",res);
    });
    this.languageSelected = true;
    this.showOnboard = false;
    this.setLanguage(lang.lngCode)
  }

  setLanguage(lng) {
    console.log(lng, 'set language')
    
    // document.documentElement.dir = dir;
    this.translate.use(lng);
    // this.selected = lng;
    // this.selectedDir = dir;
    // this.storage.set(LNG_KEY, lng);
    // this.storage.set(DIR_KEY, dir);
    this.storage.set('userLanguage', lng);
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
    this.storage.get('user_store').then(data=>{
      console.log('data');
      console.log(data)
      if(data){
        console.log('data');
        this.router.navigate(['/tabs']);
      }
    });



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
    let accountVerified =  await this.storage.get('VerifiedAccounts');
    if(accountVerified && accountVerified.some(account => account.emailId == this.emailid)){
      this.storage.get('user_store_verified').then(data=>{
        this.storage.set('user_store',data)
      })

      this.router.navigate(['/tabs']);
      loading.dismiss()

    } 
    else {
if(this.emailid){
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

}else{
  loading.dismiss()

}

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


  goToSignUp(){
    this.router.navigate(['/signup'])
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
