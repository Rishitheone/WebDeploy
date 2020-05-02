import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSubWebComponent } from './sub-sub-web.component';

describe('SubSubWebComponent', () => {
  let component: SubSubWebComponent;
  let fixture: ComponentFixture<SubSubWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSubWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSubWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
