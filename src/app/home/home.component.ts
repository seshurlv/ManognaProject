import { GlobalComponent } from './../global.component';
import { Component, OnInit } from '@angular/core';
import data from '../../assets/users.json';
import { AppComponent } from '../app.component';
//import '../../assets/js/configuresmtp.js';

declare let Email: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  isLoggedIn = GlobalComponent.isLoggedIn;
  displayedColumns: string[] = ['id', 'name', 'gender', 'email', 'mobile', 'dob', 'sendNotification'];
  dataSource: any[] = [];
  userData: any = {};
  loggedInUserDetails: any = {};

  constructor(protected app: AppComponent) { }

  ngOnInit(): void {
    this.loadJsFile("../../assets/js/configuresmtp.js");
    this.userData = data;
    this.app.loggedInUserDetails.subscribe(data => {
      this.loggedInUserDetails = data;
    })

    this.userData.forEach((element: { id: any; firstname: any; lastname: any; gender: any; email: any; mobile: any; babyDOB: any; }) => {
      let data: any = {};
      data[`id`] = element.id;
      data[`name`] = element.firstname + " " + element.lastname;
      data[`gender`] = element.gender;
      data[`email`] = element.email;
      data[`mobile`] = element.mobile;
      data[`dob`] = element.babyDOB;

      this.dataSource.push(data);
    });

    console.log("DataSource: ", this.dataSource);
    console.log("Logged in user Details: ", this.loggedInUserDetails);

    let interval: any;
    this.app.toggleChecked.subscribe((flag: boolean) => {
      if (flag) {
        interval = setInterval(() => {
          this.sendNotification();
        }, 30000);
      } else {
        clearInterval(interval);
      }
    });

  }

  public loadJsFile(url: string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }

  onStatusChange(e:any) {
    this.app.toggleChecked.next(e.checked);
  }

  sendNotification() {
    console.log(typeof Email);
    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : "babyinlaps@gmail.com",
      Password : "8A3E6A7BFA23B59C3E419C4F8A76D635AF3B",
      To : "babyinlapsuser1@gmail.com",
      From : "babyinlaps@gmail.com",
      Subject : "Vaccine Notification",
      Body : `
      <b> This is your notification for the timely vaccination. Please visit the center in 48hours to avail the vaccination</b>
      `
    });
  }

}
