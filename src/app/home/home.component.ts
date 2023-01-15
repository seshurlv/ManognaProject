import { GlobalComponent } from './../global.component';
import { Component, OnInit } from '@angular/core';
import data from '../../assets/users.json';
import { AppComponent } from '../app.component';

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
        }, 15000);
      } else {
        clearInterval(interval);
      }
    });

  }

  sendNotification() {
    alert('Sending Notification');
  }

}
