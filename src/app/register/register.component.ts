import { GlobalComponent } from './../global.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import usersData from '../common/user1.json';
import { NotificationService } from '../notification.service'
import { HttpService } from '../http-service.service';
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
  registerForm!: FormGroup;

  // users: User[] = usersData;
  // username: string = '';
  // password: string = '';
  // firstname: string = '';
  // middlename: string = '';
  // lastname: string = '';
  // email: string = '';
  // dob: string = '';
  // address: string = '';
  // phone: number = 0;
  // gender: string = '';


  constructor(private route: Router, private notifyService: NotificationService, private httpService: HttpService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      firstname: new FormControl("", [Validators.required]),
      middlename: new FormControl(""),
      lastname: new FormControl("", [Validators.required]),
      emailid: new FormControl("", [Validators.required, Validators.email]),
      address: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required, this.forbiddenPattern.bind(this)]),
      gender: new FormControl("Male", [Validators.required]),
    });

    this.registerForm.invalid;
  }

  forbiddenPattern(control: FormControl) {
    if (
      !control.value.match("[789][0-9]{9}")
    ) {
      return { inValidPattern: true };
    } else {
      return null;
    }
  }

  register() {
    // if (this.username !== "" || this.password !== "") {
    //   let user = { username: this.username, password: this.password };
    //   this.users.push(user);
    //   this.route.navigate(['login']);
    //   this.notifyService.showSuccess(this.username + " Registered Successfully !!", "")
    // }

    this.route.navigate(['login']);
    this.notifyService.showSuccess(this.registerForm.get('username')?.value + " Registered Successfully !!", "")
  }

}
