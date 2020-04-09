import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HelpLineService } from './help-line.service';
// import{Help_linephon} from './pages'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private helplineservice:HelpLineService
  ) {
    this.initializeApp();
  }
  // lsthlep_linephon:Hlep_linephon[];

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
 ngonInit(){
   this.helplineservice.getHelpline()
   .subscribe (
     data=>{

     }
   );
 }


}
