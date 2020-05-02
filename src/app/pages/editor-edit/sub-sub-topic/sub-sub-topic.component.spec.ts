import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSubTopicComponent } from './sub-sub-topic.component';

describe('SubSubTopicComponent', () => {
  let component: SubSubTopicComponent;
  let fixture: ComponentFixture<SubSubTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSubTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSubTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
