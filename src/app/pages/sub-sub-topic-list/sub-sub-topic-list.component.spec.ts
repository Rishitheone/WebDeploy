import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSubTopicListComponent } from './sub-sub-topic-list.component';

describe('SubSubTopicListComponent', () => {
  let component: SubSubTopicListComponent;
  let fixture: ComponentFixture<SubSubTopicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSubTopicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSubTopicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
