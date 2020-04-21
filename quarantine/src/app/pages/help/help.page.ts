import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  type:any
  layoff: boolean;
  helpArray: string[];

  constructor() { }

  ngOnInit() {
    this.helpArray =["Food Request","I am Elderly/Handicapped","Medical help","Job/Layoff","Other"]
  }

  helpType()
  {
    console.log("type",this.type)
    if(this.type=="Job/Layoff")
    {
      this.layoff=true;
    }
    else
    {
      this.layoff=false
    }
  }

}
