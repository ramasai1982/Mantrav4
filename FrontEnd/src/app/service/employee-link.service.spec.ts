import { TestBed } from '@angular/core/testing';

import { EmployeeLinkService } from './employee-link.service';

describe('EmployeeLinkService', () => {
  let service: EmployeeLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
