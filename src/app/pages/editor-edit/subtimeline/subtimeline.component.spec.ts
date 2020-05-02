import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtimelineComponent } from './subtimeline.component';

describe('SubtimelineComponent', () => {
  let component: SubtimelineComponent;
  let fixture: ComponentFixture<SubtimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
