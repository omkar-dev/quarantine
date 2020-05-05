import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient,HttpParams } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

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
  fromTime="";
  toTime="";
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
  shopDetails: boolean=false;
    
    constructor(private formBuilder: FormBuilder,
      private router:Router,private httpclient:HttpClient,
      public alertController : AlertController) { }



  ngOnInit() {
    this.signupForm=this.formBuilder.group({
      emailAddress: [this.email, Validators.compose([Validators.maxLength(30), Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
      name: [this.name, Validators.compose([Validators.maxLength(100), Validators.pattern('^[\u0600-\u06FFa-zA-Z ]*$'), Validators.required])],
      locality:[this.location, Validators.compose([Validators.maxLength(250), Validators.required])],
    })
    this.shopForm=this.formBuilder.group({
      shopName: [this.shop_name, Validators.compose([Validators.maxLength(100), Validators.pattern('^[\u0600-\u06FFa-zA-Z ]*$'), Validators.required])],
      shopLocality:[this.shop_locality, Validators.compose([Validators.maxLength(100), Validators.required])],
      shopAddress:[this.shop_address, Validators.compose([Validators.maxLength(200), Validators.required])]
    })
  }

  selectType(type)
  {
    this.others=this.grocery=this.medical=false;
    type=='others'? this.others=true:(type=='grocery'?this.grocery=true:this.medical=true)
    console.log("selected type : ",type)
  }

  signUp(){
    if(this.signupForm.valid){
      this.others==true?this.SendCode():this.shopDetails=true
    }else
      this.validateAllFormFields(this.signupForm)

  }

  SendCode(){
console.log('s')
    let name = this.signupForm.get('name').value;
      let email = this.signupForm.get('emailAddress').value;
      let locality = this.signupForm.get('locality').value;
      let  type=this.others?'member':this.grocery||this.medical?'shop':null;
      let params =    {
        "userid": "c4239d9cf3b9",
        "verfication_code" : " ",
        "name": name,
        "locality": locality,
        "email": email,
        "account_type": type,
        "shop": {}
    }


      let params2 = new HttpParams();
      params2 = params2.append('user_name',name);
      params2 = params2.append('email', email);
      params2 = params2.append('attempt', '2');
      // this.httpclient.



      this.httpclient.post(
       'https://us-central1-quarantine-4a6e8.cloudfunctions.net/signup-2',(params), {headers: {'Content-Type': 'application/json'}}
      
      )
      .subscribe(res=>{ 
        this.httpclient.get(
          'https://us-central1-quarantine-4a6e8.cloudfunctions.net/verify_code_send',
          {params: params2, responseType: 'text'}
        )
        .subscribe(res=>{
          if(res==='Otp Send'){
            this.shopDetails=false;
            let navData={
              showVc:true
            }
            this.router.navigate(['/login/verifyCode'])
          }
        },err=>console.log(err))
        console.log("Details", name, email, this.location, this.type)
        
      });
        
        
  
  }

  shopDetailsSubmit(){
    if(this.shopForm.valid && this.fromTime!="" && this.toTime!=""){
      console.log(this.shopForm.value,'form values')
      this.SendCode()
    }else{
      !this.shopForm.valid?this.validateAllFormFields(this.shopForm):this.presentAlert()
    }
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

  async presentAlert(){
    const alert = await this.alertController.create({
      header: "Incomplete details",
      message: "Please enter the From and To Time",
      buttons: ["ok"]
    });
    await alert.present();
  }

}
