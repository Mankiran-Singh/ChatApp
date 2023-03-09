import { TestBed } from '@angular/core/testing';

import { CourseguardService } from './courseguard.service';

describe('CourseguardService', () => {
  let service: CourseguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
