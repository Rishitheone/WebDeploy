import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsubtimlineComponent } from './subsubtimline.component';

describe('SubsubtimlineComponent', () => {
  let component: SubsubtimlineComponent;
  let fixture: ComponentFixture<SubsubtimlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsubtimlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsubtimlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
