import { TestBed } from '@angular/core/testing';

import { SubtopicService } from './subtopic.service';

describe('SubtopicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubtopicService = TestBed.get(SubtopicService);
    expect(service).toBeTruthy();
  });
});
