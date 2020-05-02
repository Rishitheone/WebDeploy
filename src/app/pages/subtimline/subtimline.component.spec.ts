import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubtimlineListComponent } from './subtimline.component';

describe('SubtimlineComponent', () => {
  let component: SubtimlineListComponent;
  let fixture: ComponentFixture<SubtimlineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtimlineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtimlineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
