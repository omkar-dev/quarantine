import { Component, OnInit } from '@angular/core';
import { HelpLineService } from '../../services/help-line/help-line.service';

@Component({
  selector: 'app-helpline',
  templateUrl: './helpline.page.html',
  styleUrls: ['./helpline.page.scss'],
})
export class HelplinePage implements OnInit {

  constructor(private helplineservice:HelpLineService  ) { }
  Helpline:string;
  Helpline_id:number;
  Helpline_name:string;
  Helpline_no:number;
  Helpline_line:number;


  ngOnInit() {
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









