import { Component, OnInit } from '@angular/core';
import { InstituionService } from 'src/app/shared/instituion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-instituion',
  templateUrl: './about-instituion.component.html',
  styleUrls: ['./about-instituion.component.scss']
})
export class AboutInstituionComponent implements OnInit {

  about;
  constructor(public service: InstituionService,private _router: Router,) { }

  ngOnInit(): void {
    this.about = this.service.getAbout()
    if(this.about.length === 0){
      this._router.navigate(['/home/Institution'])
    }
  }

}
