import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
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
import { NavController, LoadingController, Platform, AlertController, IonSlides, ModalController, NavParams } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  @Input() data;
  @ViewChild('v1', { static: false }) myInput1;
  @ViewChild('v2', { static: false }) myInput2;
  @ViewChild('v3', { static: false }) myInput3;
  @ViewChild('v4', { static: false }) myInput4;
  @ViewChild('v5', { static: false }) myInput5;
  @ViewChild('v6', { static: false }) myInput6;

  vc1="";
  vc2="";
  vc3="";
  vc4="";
  vc5="";
  vc6="";
  verificationCode:string;
  emailid: any;
  showVC: boolean;


  constructor(public navParams: NavParams,
    private nativeStorage: NativeStorage,
      public loadingController: LoadingController,
      private platform: Platform,
      public alertController: AlertController,
      private storage:Storage,
      private device: Device,
      private androidPermissions: AndroidPermissions,
      private geolocation: Geolocation,
     private router:Router,public translate: TranslateService, private navCtrl: NavController,
     private route:ActivatedRoute, private http: HttpClient, private modalController : ModalController
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    let LOC = (this.navParams.get('data'));
    console.log("data",LOC)
    this.emailid = LOC
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

  async presentLoading(loading) {
    return await loading.present();
  }

  async verifyCode() {
    const loading = await this.loadingController.create({
      message: 'Verifying details'
    });
    this.presentLoading(loading);
    console.log("inside verifycode")
    let params = new HttpParams();
    params = params.append('user_code',this.verificationCode );
    params = params.append('email', this.emailid);
    params = params.append('attempt', '2');
    params = params.append('user_name', ' ');

    this.http.get('https://us-central1-quarantine-4a6e8.cloudfunctions.net/verify_code', { params: params } )
      .pipe(
        catchError(e => {
          loading.dismiss()
          this.showAlert('Wrong OTP! Try Again!');
          this.vc1 = this.vc2 = this.vc3 = this.vc4 = this.vc5 = this.vc6 = "";
          throw new Error(e.error);
        })
        )
        .subscribe(response => {
          this.router.navigate(['/tabs']);
          this.showVC = false;
          this.storeVerifiedAccount();
          loading.dismiss()
          this.modalController.dismiss()
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

  async showAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.present();
  }

}
