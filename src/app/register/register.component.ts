import { GlobalComponent } from './../global.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import usersData from '../common/user1.json';
import { NotificationService } from '../notification.service'
import { HttpService } from '../http-service.service';
import {} from '../../assets/users.json'
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface User {
  username: String;  
  password: string;
} 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoggedIn = GlobalComponent.isLoggedIn;
  registerForm:FormGroup | undefined;

  users: User[] = usersData;
  username: string = '';
  password: string = '';
  firstname: string = '';
  middlename: string = '';
  lastname: string = '';
  email: string = '';
  dob:string = '';
  address: string = '';
  phone:number = 0;
  gender:string = '';

  private jsonURL = '../../assets/users.json';

  constructor(private route: Router, private notifyService : NotificationService,private httpService: HttpService) {

   }

  ngOnInit(): void {
    this.registerForm = new FormGroup ({
      username : new FormControl("",[Validators.required]),
      password : new FormControl("",[Validators.required]),
      firstname : new FormControl("",[Validators.required]),
      middlename : new FormControl(""),
      lastname : new FormControl("",[Validators.required]),
      email : new FormControl("",[Validators.required,Validators.email]),
      address : new FormControl("",[Validators.required]),
      dob : new FormControl("",[Validators.required]),
      phone : new FormControl("",[Validators.required,Validators.pattern("[789][0-9]{9}")]),
      gender : new FormControl("",[Validators.required]),
    })
  }

  register() {  
    // console.log('username: ',this.username);
    // console.log('password: ',this.password);
    // console.log('firstname: ',this.firstname);
    // console.log('middlename: ',this.middlename);
    // console.log('lastname: ',this.lastname);
    // console.log('email: ',this.email);
    // console.log('dob: ',this.dob);
    // console.log('address: ',this.address);
    // console.log('phone: ',this.phone);
    // console.log('gender: ',this.gender);
    let user = {
      'username' : this.username,
      'password' : this.password,
      'firstname' : this.firstname,
      'middlename' : this.middlename,
      'lastname' : this.lastname,
      'email' : this.email,
      'babyDOB' : this.dob,
      'address' : this.address,
      'mobile' : this.phone,
      'gender' : this.gender,
    };
    this.httpService.putJSON(this.jsonURL,user).subscribe(data => {
      console.log(data);
    });

    // if(this.username !== "" || this.password !== ""){
    //   let user = { username: this.username, password: this.password };
    //   this.users.push(user);
    //   this.route.navigate(['login']);
    //   this.notifyService.showSuccess( this.username + " Registered Successfully !!", "")
    // }
  }

}
