import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArUploaderComponent } from './ar-uploader.component';

describe('ArUploaderComponent', () => {
  let component: ArUploaderComponent;
  let fixture: ComponentFixture<ArUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
