import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubWebComponent } from './sub-web.component';

describe('SubWebComponent', () => {
  let component: SubWebComponent;
  let fixture: ComponentFixture<SubWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
