import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { RootObject } from '../shared/all.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: {};
  apiRes:boolean = false;
  message:string;
  loginUserData = {
    email:'',
    password:'',

  };
  constructor(private _auth:UserService,
    private _router:Router
    ) { }

  ngOnInit() {
  }

  loginUser () {
    this.apiRes = true;
    this.message = '';
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        this.apiRes = false;
        console.log(res)
        if(res.status === 1){
          localStorage.setItem('token', res.user.jwtToken)
          this._router.navigate(['/home'])
        }else{
          this.message = res.message;
        }
        
      },
      error => this.error = error
    ) 
  }
}