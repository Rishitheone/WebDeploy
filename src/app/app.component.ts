import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy  {
  showFiller = false;
  @ViewChild('drawer') snav;
  mobileQuery: MediaQueryList;
  isExpanded: boolean = true;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,public _authService: UserService,) {
    this.mobileQuery = media.matchMedia('(max-width: 970px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  openSideNav() {
    if (this.mobileQuery.matches) {
      this.isExpanded = true;
      this.snav.opened = true;
    }
  }

}


