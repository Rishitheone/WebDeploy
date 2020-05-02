import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsubpieListComponent } from './subsubpie-list.component';

describe('SubsubpieListComponent', () => {
  let component: SubsubpieListComponent;
  let fixture: ComponentFixture<SubsubpieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsubpieListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsubpieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
