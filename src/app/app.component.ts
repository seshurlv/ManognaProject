import { GlobalComponent } from './global.component';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'babyInLaps';
  isLoggedIn = GlobalComponent.isLoggedIn;
  loggedInUserDetails : BehaviorSubject<any> = new BehaviorSubject({});
  toggleChecked: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router:Router) {}

  ngOnInit(): void {
    this.router.navigate(['login']);
  }
}
