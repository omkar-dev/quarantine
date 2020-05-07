import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { HelpLineService } from './services/help-line/help-line.service';
import { FormsModule } from '@angular/forms';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { InAppReview } from '@ionic-native/in-app-review/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { FeedbackComponent } from './components/feedback/feedback.component';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { BackgroundGeolocation } from "@ionic-native/background-geolocation/ngx";
import { SafePipeModule } from 'safe-pipe';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Device } from '@ionic-native/device/ngx';
import { OtpPage } from './pages/otp/otp.page';


export function createTranslateLoader(http: HttpClient){ 
  return new TranslateHttpLoader(http, './assets/language_selection/', '.json')
}

@NgModule({
  declarations: [AppComponent, FeedbackComponent,OtpPage],
  entryComponents: [ FeedbackComponent,OtpPage],


  imports: [BrowserModule, IonicModule.forRoot(),
    IonicStorageModule.forRoot(), AppRoutingModule,HttpClientModule,
    FormsModule,
    SafePipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
    ],
  providers: [
    StatusBar,
    HelpLineService,
    SplashScreen,
    AndroidPermissions,
    Geolocation,
    InAppReview,
    FCM,
    GooglePlus,
    NativeStorage,
    LocalNotifications,
    NativeGeocoder,
    CallNumber,
    BackgroundGeolocation,
    Device,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
