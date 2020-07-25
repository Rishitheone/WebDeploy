import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointState, BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnDestroy {
 

  showFiller = false;
  @ViewChild('drawer') snav;
  mobileQuery: MediaQueryList;
  isExpanded: boolean = true;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {

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


