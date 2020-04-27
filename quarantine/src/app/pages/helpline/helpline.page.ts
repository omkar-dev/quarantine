import { Component, OnInit } from '@angular/core';
import { HelpLineService } from '../../services/help-line/help-line.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-helpline',
  templateUrl: './helpline.page.html',
  styleUrls: ['./helpline.page.scss'],
})
export class HelplinePage implements OnInit {
  lang: string;

  constructor(private helplineservice:HelpLineService
    ,public translate: TranslateService  ) { 

      this.lang = 'en';
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }


  Helpline:string;
  Helpline_id:number;
  Helpline_name:string;
  Helpline_no:number;
  Helpline_line:number;


  ngOnInit() {
  }
  switchLanguage() {
    this.translate.use(this.lang);
  }

  GetHelpLine(){
    this.helplineservice.getHelpline().subscribe((data)=>
    {
      var anyData=<any>data;
      this.GetHelpLine=anyData.data;
    }
    )
  }

}









