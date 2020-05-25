import { Component, OnInit } from '@angular/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import {Location} from '@angular/common';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-need-help',
  templateUrl: './need-help.page.html',
  styleUrls: ['./need-help.page.scss'],
})
export class NeedHelpPage implements OnInit {

  helpRequestArray=[]
  helpFor: any;
  location: any;
  lat: number;
  long: any;
  locationData: { lat: string; long: string; country: string; city: string; postCode: string; };
  contactNo : any;
  helpText : any;
  jobForm: FormGroup;
  designation: any;
  validation_messages: any
  experience: any;
  linkedIn: any;
  industry: any;
  normalForm: FormGroup;
  userContactNo: any;
  
  constructor(private http : HttpService,
    private _location: Location,
    private storage: Storage,
    private formBuilder: FormBuilder,private router : Router,private geolocation : Geolocation, private nativeGeocoder: NativeGeocoder, public loadingCtrl: LoadingController) { 
    this.jobForm = formBuilder.group({
      designation: [this.designation, Validators.compose([Validators.maxLength(100), Validators.pattern('^[\u0600-\u06FFa-zA-Z ]*$'), Validators.required])],
      experience: [this.experience, Validators.compose([Validators.maxLength(30),Validators.pattern('[0-9]+'), Validators.required])],
      linkedIn: [this.linkedIn, Validators.compose([Validators.maxLength(100),Validators.required])],
      industry: [this.industry, Validators.compose([Validators.maxLength(100), Validators.pattern('^[\u0600-\u06FFa-zA-Z ]*$'), Validators.required])],


    });
    this.normalForm = formBuilder.group({
      helpText: [this.helpText, Validators.compose([Validators.maxLength(100), Validators.required])],
      contactNo: [this.contactNo, Validators.compose([Validators.maxLength(10),Validators.pattern('[0-9]+'), Validators.required])],
      location: [this.location, Validators.compose([Validators.maxLength(100), Validators.pattern('^[\u0600-\u06FFa-zA-Z ]*$'), Validators.required])],


    });

     this.validation_messages = {
      'experience': [
        { type: 'required', message: 'Experience is required' },
        { type: 'pattern', 
        message: 'Experience should only be in numbers' }
      ],
      'linkedIn': [
        { type: 'required', message: 'Enter LinkedIn Profile' },
      ],
      'industry': [
        { type: 'required', message: 'Industry is required' },
        { type: 'pattern', message: 'Industry should only be in characters' }
      ],
      'designation': [
        { type: 'required', message: 'Designation is required' },
        { type: 'pattern', message: 'Designation cannot contain numbers' }
      ],
      'helpText': [
        { type: 'required', message: 'Help Info is required to help you better!' }
      ],
      'contactNo': [
        { type: 'required', message: 'Contact number is required' },
        { type: 'pattern', message: 'Contact should contain only numbers' }
      ],
      'location': [
        { type: 'required', message: 'Location is required' },
        { type: 'pattern', message: 'Location should accept only characters' }
      ]
    }
  }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.helpRequestArray =[{
      name : "Handicap",
      imgUrl : "handiCaf.svg",
    show:false

    },
  {
    name : "Medical Help",
    imgUrl : "medical_1.svg",
    show:false

  },
  {
    name : "Job Layoffs",
    imgUrl : "job.svg",
    show:false

  },
  {
    name : "Food Requests",
    imgUrl : "food_request.svg",
    show:false
  }
]
  }

  selectReq(data,index)
  {
    this.helpRequestArray.map(help=>help.show=false);
    data.show=true;
    // this.handicap=this.medHelp=this.layoff=this.foodReq=false
    console.log(data,index)
    this.helpFor = data.name
    console.log("helpFor",this.helpFor)
  }


  async detectLocation()
  {
    console.log("inside detectlocation")
    const loading = await this.loadingCtrl.create({
      message: 'Detecting Location'
    });
    this.presentLoading(loading);   
     this.geolocation.getCurrentPosition().then((resp) => {
      // let loc = {}
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
      this.getReverseGeoCode(this.lat,this.long)
loading.dismiss();

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getReverseGeoCode(lat,long)
  {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };
  
  this.nativeGeocoder.reverseGeocode(lat, long, options)
    .then((result: NativeGeocoderResult[]) => {
      if(result)
      {
        this.loadingCtrl.dismiss()
      }
      console.log("reverseResult",result)
      this.location = result[0].locality
      // this.locationData = {
      //   lat : result[0].latitude,
      //   long :result[0].longitude,
      //   country : result[0].countryName,
      //   city : result[0].locality,
      //   postCode : result[0].postalCode
      // }
    })
    .catch((error: any) => console.log(error));
  }

  async presentLoading(loading) {
    return await loading.present();
  }
  gotoPost()
  {
    this.router.navigateByUrl('/posts')
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

  async submit()
  {
    const loading = await this.loadingCtrl.create({
      message: 'Submiting details'
    });
    this.presentLoading(loading);
    this.contactNo =this.normalForm.get('contactNo').value
    this.helpText = this.normalForm.get('helpText').value
    this.location = this.normalForm.get('location').value
    this.experience =this.jobForm.get('experience').value
  this.linkedIn = this.jobForm.get('linkedIn').value
  this.designation = this.jobForm.get('designation').value
  this.industry = this.jobForm.get('industry').value

  this.storage.get('user_store').then(userStore=>{

console.log(this.helpFor!=='Job Layoffs', this.helpFor,this.normalForm.valid)

if(this.helpFor=='Job Layoffs' && this.jobForm.valid)
{

  let body = {
    "user_id":userStore['userid'],
    "help_for":this.helpFor,
    "help_info":this.helpText,
    "phone_no":this.contactNo,
    "locality": this.location,
    "jobs_user_name" : "Name",
    "jobs_user_exp" : this.experience,
    "linked_in_profile_link" : this.linkedIn,
    "current_designation" : this.designation,
    "industry" : this.industry,
    "current_company" : "XYZ Technologies"
  }
  this.http.helpPostRequest(body).subscribe(res=>{
    console.log("res",res)
    loading.dismiss()
  })
  
}


else if(this.helpFor!='Job Layoffs' && this.normalForm.valid)
{
 
  let body = {      
    "user_id":userStore['userid'],
    "help_for":this.helpFor,
    "help_info":this.helpText,
    "phone_no":this.contactNo,
    "locality": this.location
    }
    console.log("body",body)
    this.http.helpPostRequest(body).subscribe(res=>{
      console.log("Success")
      loading.dismiss()
    })
  
} 
else
{
  console.log("Please check the input fields")
  loading.dismiss()
}

})
}



}

