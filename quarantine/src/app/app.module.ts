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
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http: HttpClient){ 
  return new TranslateHttpLoader(http, './assets/language_selection/', '.json')
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],

  imports: [BrowserModule, IonicModule.forRoot(),
    IonicStorageModule.forRoot(), AppRoutingModule,HttpClientModule,
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

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
