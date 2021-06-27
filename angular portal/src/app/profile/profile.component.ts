import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  showFiller = false;
  panelOpenState = false;
  page = 'Profile';
  ngOnInit(): void {
  }
  route(page){
    this.page = page;
  }
}
