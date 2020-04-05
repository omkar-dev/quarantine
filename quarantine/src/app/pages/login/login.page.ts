import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  languages: string[];

  constructor() { }

  ngOnInit() {
    this.languages=[
      'English',
      'Hindi',
      'Bengal',
      'Gujrati',
      'Kannada',
      'Marathi',
      'Tamil',
      'Telgu'  ]
      
  }

}
