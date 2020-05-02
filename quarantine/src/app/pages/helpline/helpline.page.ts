import { Component, OnInit } from '@angular/core';
import { HelpLineService } from '../../services/help-line/help-line.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from 'src/app/services/http.service';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-helpline',
  templateUrl: './helpline.page.html',
  styleUrls: ['./helpline.page.scss'],
})
export class HelplinePage implements OnInit {
  lang: string;
  data: any;
  donationsArray: any;
  epidemicsArray: any;
  helpLineArray: any;
  contactNumber: any;

  constructor(private helplineservice:HelpLineService
    ,public translate: TranslateService,
    public http : HttpService,
    private callNumber: CallNumber ) { 

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

  ionViewWillEnter()
  {
    this.http.getDonations().subscribe(res=>{
      console.log("resss",res)
      this.data = res['data']
      console.log("len",this.data.length)
      let i
      this.donationsArray=[]
      this.epidemicsArray=[]
      this.helpLineArray = []
      for(i=0;i<this.data.length;i++)
      {
        this.donationsArray.push(this.data[i]['Donations'])
        this.epidemicsArray.push(this.data[i]['Epidemics'])
        this.helpLineArray.push(this.data[i]['Helplines'])
      }
      console.log("Donate Array", this.donationsArray) 
      console.log("Epi Array", this.epidemicsArray) 
      console.log("Helpline", this.helpLineArray)  
 
 


    })
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

  openDialer(contact)
  {
    console.log("contact",contact)
    this.contactNumber = contact
    console.log(typeof(this.contactNumber))
  this.callNumber.callNumber(this.contactNumber, true)
.then(res => console.log('Launched dialer!', res))
.catch(err => console.log('Error launching dialer', err));
  }

}









