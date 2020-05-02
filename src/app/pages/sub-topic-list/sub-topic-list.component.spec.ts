import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTopicListComponent } from './sub-topic-list.component';

describe('SubTopicListComponent', () => {
  let component: SubTopicListComponent;
  let fixture: ComponentFixture<SubTopicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubTopicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTopicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
