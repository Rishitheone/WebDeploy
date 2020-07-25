import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutInstituionComponent } from './about-instituion.component';

describe('AboutInstituionComponent', () => {
  let component: AboutInstituionComponent;
  let fixture: ComponentFixture<AboutInstituionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutInstituionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutInstituionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
