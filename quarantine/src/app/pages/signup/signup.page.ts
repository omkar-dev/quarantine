import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient,HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  shopForm:FormGroup;
  signupForm:FormGroup;

  name;
  locality;
  email : " "
  Verification_code:""
  account_type:"" 
  shop_type:""
  shop_name:""
  shop_timings:""
  shop_locality : " "
  shop_coordinates:""
  shop_address:""
  bottomPopup:boolean=false;
  fromTime;
  toTime;
  // checkbox1=false;
  // checkbox2=false;
  // checkbox3=false;
  selectedCheckbox;
  checkboxData=['Are you a Medical Owner','Are you a Grocery Owner','None of the above']

  fullName : String
  location : String

validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required' },
      { type: 'pattern', message: 'Name must contain only letters' }
    ],
    'emailAddress': [
      { type: 'required', message: 'Email Id is required' },
      { type: 'pattern', message: 'Enter a valid Email Id' }
    ],
    'locality': [
      { type: 'required', message: 'Locality details required' },
    ],
    'shopName': [
      { type: 'required', message: 'Shop Name is required' },
      { type: 'pattern', message: 'Name must contain only letters' }
    ],
    'shopAddress': [
      { type: 'required', message: 'Shop Address is required' }
    ],
    'shopLocality': [
      { type: 'required', message: 'Shop Locality details required' },
    ]
  }
  type: any;
  others: boolean=true;
  medical: boolean;
  grocery: boolean;
  flag: any;
    
    constructor(private formBuilder: FormBuilder,
      private router:Router,private httpclient:HttpClient) { }



  ngOnInit() {
    this.signupForm=this.formBuilder.group({
      emailAddress: [this.email, Validators.compose([Validators.maxLength(30), Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
      name: [this.name, Validators.compose([Validators.maxLength(100), Validators.pattern('^[\u0600-\u06FFa-zA-Z ]*$'), Validators.required])],
      locality:[this.location, Validators.compose([Validators.maxLength(250), Validators.required])],
    })
    this.shopForm=this.formBuilder.group({
      shopName: [this.shop_name, Validators.compose([Validators.maxLength(100), Validators.pattern('^[\u0600-\u06FFa-zA-Z ]*$'), Validators.required])],
      shopLocality:[this.shop_locality, Validators.compose([Validators.maxLength(100), Validators.required])],
      shopAddress:[this.shop_locality, Validators.compose([Validators.maxLength(200), Validators.required])]
    })
  }
  onSubmit(){
    if(this.signupForm.valid){

    this.bottomPopup= this.selectedCheckbox!= 2?true:false;
    this.bottomPopup==false?this.router.navigate(['/dashboard']):null;
    }
  }

  selectType(type)
  {

    if(type=='others')
    {
        this.type = 'others'
        this.others = true
        this.grocery = false
        this.medical = false

    }
    else if (type =='medical')
    {
        this.type = 'medical'
       this.medical=true
       this.others = false
       this.grocery = false
    }
    else if(type == 'grocery')
    {
        this.type = 'grocery'
        this.grocery = true   
        this.others = false
        this.medical = false 
 }
    console.log("selected type : ",this.type)
  }

  signUp()
  {

    let name=this.signupForm.get('name').value;
    let email=this.signupForm.get('emailAddress').value
    let params = new HttpParams();
    params = params.append('user_name',name);
    params = params.append('email', email);
    params = params.append('attempt', '2');
    // this.httpclient.
    this.httpclient.get(
      'https://us-central1-quarantine-4a6e8.cloudfunctions.net/verify_code_send',
      {params: params, responseType: 'text'}
    )
    .subscribe(res=>{
      if(res==='Otp Send'){
        let navData={
          showVc:true
        }
        this.router.navigate(['/login/verifyCode'])
      }
    },err=>console.log(err))
    
    console.log("Details", name, email, this.location, this.type)
  }

}
