import { GlobalComponent } from './../global.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import data from '../common/users.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = GlobalComponent.isLoggedIn;
  
  username: string = '';
  password: string = '';

  userData: any = {};

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.userData = data;
    console.log(this.userData)
  }

  login() {
    console.log('UserName: ', this.username);
    console.log('Password: ', this.password);

    this.userData.forEach((element: any) => {
      if (element.username === this.username && element.password === this.password) {
        this.route.navigate(['home']);
      } else {
        this.username = '';
        this.password = '';
      }
    });

  }

}
