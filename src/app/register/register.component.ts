import { GlobalComponent } from './../global.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import usersData from '../common/user1.json';
import { NotificationService } from '../notification.service'

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

  users: User[] = usersData;
  username: string = '';
  password: string = '';

  constructor(private route: Router, private notifyService : NotificationService) {

   }

  ngOnInit(): void {
  }

  register() {  
    if(this.username !== "" || this.password !== ""){
      let user = { username: this.username, password: this.password };
      this.users.push(user);
      this.route.navigate(['login']);
      this.notifyService.showSuccess( this.username + " Registered Successfully !!", "")
    }
  }

}
