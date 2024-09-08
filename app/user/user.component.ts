import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  myProfileForm: FormGroup;
  firstNameVal: string = '';
  lastNameVal: string = '';
  streetName: string = '';
  cityName: string = '';
  stateName: string = '';
  zip: string = '';
  gender: string = '';
  hobbies: string[] = [];

  postURL: any = 'http://127.0.0.1:8000/submit-profile/';
  // showTexArea = false;
  prevTextArea = false;

  myHobbies: string[] = [];

   chkValue: any = [
    {id: 1, value: 'Reading'},
    {id: 2, value: 'Traveling'},
    {id: 3, value: 'Sports'},
    {id: 4, value: 'Music'},
    {id: 5, value: 'Gaming'},
    {id: 6, value: 'Cooking'},
  ]
   chkGender: any = [
    {id: 1, value: 'Male' },
    {id: 2, value: 'Female' },
    {id: 3, value: 'Other' },
    ]

    constructor(
      private formBuilder: FormBuilder,
       private http: HttpClient) {
      this.myProfileForm = this.formBuilder.group({
        fName: ['',[Validators.required]],
        lName: ['', [Validators.required]],
        streetName: ['', [Validators.required]],
        cityName: ['', [Validators.required]],
        stateName: ['', [Validators.required]],
        zip: ['', [Validators.required]],
        gender: ['Male', [Validators.required]],
        hobbies: this.formBuilder.array([]),
        favPlace:[]
      })
    }

     // Handle checkbox changes



    onSubmit() {
      if(this.prevTextArea == true) {
        this.prevTextArea = false;
      } else {
        console.log(this.myProfileForm.value, this.myProfileForm.get('hobbies')?.value)
        this.firstNameVal = this.myProfileForm.controls['fName'].value;
        this.lastNameVal = this.myProfileForm.controls['lName'].value;
        this.streetName = this.myProfileForm.controls['streetName'].value;
        this.cityName = this.myProfileForm.controls['cityName'].value;
        this.stateName = this.myProfileForm.controls['stateName'].value;
        this.zip = this.myProfileForm.controls['zip'].value;
        this.gender = this.myProfileForm.controls['gender'].value;
        this.hobbies = this.myProfileForm.controls['hobbies'].value;
        this.prevTextArea = true;

        const profileData: any = 
          {
            "fName": this.myProfileForm.controls['fName'].value,
            "lName": this.myProfileForm.controls['lName'].value,
            "streetName": this.myProfileForm.controls['streetName'].value,
            "cityName": this.myProfileForm.controls['cityName'].value,
            "stateName": this.myProfileForm.controls['stateName'].value,
            "zip": this.myProfileForm.controls['zip'].value,
            "gender":  this.myProfileForm.controls['gender'].value,
            "hobbies": [
              'Cricket', 'Football', 'Vollyball'
            ],
            "favPlace": this.myProfileForm.controls['favPlace'].value
          
        }

        this.http.post(this.postURL, profileData).subscribe(
          res => {
            console.log('POST', res);
            
          }
        );
      }
    }

  // addInfo(){
  //   if( this.showTexArea == true) {
  //     this.showTexArea = false;
  //   } else {
  //     this.showTexArea = true;
  //   }
  // }
  
  prevInfo(){
    if(this.prevTextArea == true) {
      this.prevTextArea = false;
    } else {
      this.prevTextArea = true;
    }
  }

  getHobbies(e: any){
    const hobbies: FormArray = this.myProfileForm.get('hobbies') as FormArray;
  
  }
}
