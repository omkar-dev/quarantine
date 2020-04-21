import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { HelpLineService } from './services/help-line/help-line.service';
import { FormsModule } from '@angular/forms';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { InAppReview } from '@ionic-native/in-app-review/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

import { FeedbackComponent } from './components/feedback/feedback.component';

@NgModule({
  declarations: [AppComponent, FeedbackComponent],
  entryComponents: [ FeedbackComponent ],

  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    HelpLineService,
    SplashScreen,
    AndroidPermissions,
    Geolocation,
    InAppReview,
    FCM,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
