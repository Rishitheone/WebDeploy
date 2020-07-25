import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionUpdateComponent } from './institution-update.component';

describe('InstitutionUpdateComponent', () => {
  let component: InstitutionUpdateComponent;
  let fixture: ComponentFixture<InstitutionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
