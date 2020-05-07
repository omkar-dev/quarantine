import { Component, OnInit } from '@angular/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';



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
  contactNo : Number;
  helpText : String;
  jobForm: FormGroup;
  designation: any;
  validation_messages: any
  experience: any;
  linkedIn: any;
  industry: any;
  normalForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,private router : Router,private geolocation : Geolocation, private nativeGeocoder: NativeGeocoder, public loadingCtrl: LoadingController) { 
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
        { type: 'pattern', message: 'Experience should only be in numbers' }
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
    this.presentLoading()
    this.geolocation.getCurrentPosition().then((resp) => {
      // let loc = {}
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
      this.getReverseGeoCode(this.lat,this.long)


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

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Detecting Location',
      duration: 2000
    });
    await loading.present();
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

  submit()
  {
if(this.helpFor=='Job Layoffs' && this.jobForm.valid)
{
  console.log("Job Form successfully submitted")
}
else if(this.helpFor!='Job Layoffs' && this.normalForm.valid)
{
  console.log("Normal form submitted successfully")
} 
else
{
  console.log("Please check the input fields")
} 
}

}

