import { Component, OnInit } from '@angular/core';
// import { Routes } from '@angular/router';

@Component({
  selector: 'app-mydashboard',
  templateUrl: './mydashboard.component.html',
  styleUrls: ['./mydashboard.component.css']
})
export class MydashboardComponent implements OnInit {
page;
  constructor( ) { }

  ngOnInit(): void {
  }
  route(page){
    this.page = page;
  }

}
