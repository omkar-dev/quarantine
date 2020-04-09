import { Component, OnInit } from '@angular/core';
import { HelpLineService } from 'src/app/help-line.service';


@Component({
  selector: 'app-hlep-linephon',
  templateUrl: './hlep-linephon.page.html',
  styleUrls: ['./hlep-linephon.page.scss'],
})
export class HlepLinephonPage implements OnInit {

  constructor(private helplineservice:HelpLineService,
    ) { }

  ngOnInit() {
  }
       Helpline:string;
      Helpline_id:number;
      Helpline_name:string;
      Helpline_no:number;
      Helpline_line:number;

  GetHelpLine(){
    this.helplineservice.getHelpline().subscribe((data)=>
    {
      var anyData=<any>data;
      this.GetHelpLine=anyData.data;
    }
    )
  }


}
