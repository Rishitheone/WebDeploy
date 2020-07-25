import { TestBed } from '@angular/core/testing';

import { InstituionService } from './instituion.service';

describe('InstituionService', () => {
  let service: InstituionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
