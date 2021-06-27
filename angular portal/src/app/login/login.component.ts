import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient, private router:Router
  ) { }
  res;
  res1;
  ngOnInit(): void {
  }
  loginfunction(login){
    this.http.post('http://localhost:3000/login',login.value).subscribe(result=>{
      console.log(result);
    this.res=result;
    this.res1=this.res['_text'];
    // if(this.res1=="SUCCESS"){
      
    // }
    
     
  
    })
    this.router.navigate(['/dashboard']);
    //  console.log(login.value);
  }

}
