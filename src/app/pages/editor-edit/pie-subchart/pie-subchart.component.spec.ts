import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieSubchartComponent } from './pie-subchart.component';

describe('PieSubchartComponent', () => {
  let component: PieSubchartComponent;
  let fixture: ComponentFixture<PieSubchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieSubchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieSubchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
