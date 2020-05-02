import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpieListComponent } from './subpie-list.component';

describe('SubpieListComponent', () => {
  let component: SubpieListComponent;
  let fixture: ComponentFixture<SubpieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubpieListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubpieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
