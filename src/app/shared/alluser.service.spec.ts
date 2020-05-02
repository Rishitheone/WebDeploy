import { TestBed } from '@angular/core/testing';

import { AlluserService } from './alluser.service';

describe('AlluserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlluserService = TestBed.get(AlluserService);
    expect(service).toBeTruthy();
  });
});
