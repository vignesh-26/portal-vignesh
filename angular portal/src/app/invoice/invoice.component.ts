import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  safeSrc: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer, private router:Router) {
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/0YgB1Zo4ojw");
    
    // this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/watch?v=fRD_3vJagxk");
   }
  ngOnInit(): void {
  }

}
