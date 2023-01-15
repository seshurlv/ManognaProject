import { GlobalComponent } from './../global.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = GlobalComponent.isLoggedIn;
  private jsonURL = '../../assets/users.json';
  username: string = '';
  password: string = '';
  flag: boolean = false;
  userData: any = {};

  constructor(private route: Router, private app: AppComponent, private httpService: HttpService) {
    this.httpService.getJSON(this.jsonURL).subscribe(data => {
      this.userData = data;
      console.log(this.userData);
    });
  }

  ngOnInit(): void { }

  login() {
    this.userData.forEach((element: any) => {
      if (element.username === this.username && element.password === this.password) {
        this.app.loggedInUserDetails.next(element);
        this.flag = true;
        this.route.navigate(['home']);
      }
    });
    if (!this.flag) {
      this.username = '';
      this.password = '';
    }
  }

}
