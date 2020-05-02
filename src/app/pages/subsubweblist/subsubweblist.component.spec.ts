import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsubweblistComponent } from './subsubweblist.component';

describe('SubsubweblistComponent', () => {
  let component: SubsubweblistComponent;
  let fixture: ComponentFixture<SubsubweblistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsubweblistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsubweblistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
