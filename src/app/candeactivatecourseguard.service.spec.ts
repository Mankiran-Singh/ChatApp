import { TestBed } from '@angular/core/testing';

import { CandeactivatecourseguardService } from './candeactivatecourseguard.service';

describe('CandeactivatecourseguardService', () => {
  let service: CandeactivatecourseguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandeactivatecourseguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
